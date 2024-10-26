import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from '../users/usuarios.service';
import { CriarUsuariosDto } from '../users/dto/criar-usuarios.dto';
import { UsuarioTipoEnum } from '../users/enum/usuario-tipo.enum';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AutenticacaoService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usuariosService: UsuariosService,
    private readonly mailerService: MailerService,
  ) {}

  async validateUser(email: string, senha: string): Promise<any> {
    const user = await this.usuariosService._getByParams({ email });
    if (user && (await bcrypt.compare(senha, user.senha))) {
      const { senha, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(criarUsuariosDto: CriarUsuariosDto) {
    return this.usuariosService.criarUsuario({
      ...criarUsuariosDto,
      tipo: UsuarioTipoEnum.PROPRIETARIO,
    });
  }

  async esqueciSenha(email: string) {
    const user = await this.usuariosService._getByParams({ email });

    if (!user) {
      throw new BadRequestException('Email não encontrado na base de dados.');
    }

    const token = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        expiresIn: '30 minutes',
        subject: String(user.id),
        issuer: 'esqueci',
        audience: 'users',
      },
    );

    await this.mailerService.sendMail({
      subject: 'Recuperação de senha',
      to: 'woodrow.klocko40@ethereal.email',
      template: 'esqueci',
      context: {
        name: user.nome,
        token,
      },
    });

    return true;
  }

  async redefinir(senha: string, token: string) {
    try {
      const data: any = this.jwtService.verify(token, {
        issuer: 'esqueci',
        audience: 'users',
      });

      if (isNaN(Number(data.id))) {
        throw new BadRequestException('Token é inválido.');
      }

      const salt = await bcrypt.genSalt();
      const senhaHash = await bcrypt.hash(senha, salt);

      const user = await this.usuariosService._getByParams({
        id: Number(data.id),
      });

      const senhaParaAtualizar = {
        ...user,
        senha: senhaHash,
      };

      await this.usuariosService.atualizarUsuario(user.id, senhaParaAtualizar);

      const payload = { username: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (e) {
      throw new BadRequestException('Erro ao redefinir a senha: ' + e.message);
    }
  }
}
