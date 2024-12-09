/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from '../users/usuarios.service';
import { CriarUsuariosDto } from '../users/dto/criar-usuarios.dto';
import { UsuarioTipoEnum } from '../users/enum/usuario-tipo.enum';
import { MailerService } from '@nestjs-modules/mailer';
import * as NodeCache from 'node-cache';
import { RedefinirDto } from './dto/redefinir.dto';

@Injectable()
export class AutenticacaoService {
  private recoveryCodeCache: NodeCache;
  constructor(
    private readonly jwtService: JwtService,
    private readonly usuariosService: UsuariosService,
    private readonly mailerService: MailerService,
  ) {
    this.recoveryCodeCache = new NodeCache({ stdTTL: 1800, checkperiod: 600 });
  }

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
      id: user.id,
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
  
    const recoveryCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = this.jwtService.sign(
      { id: user.id },
      {
        expiresIn: '30 minutes',
        subject: String(user.id),
        issuer: 'esqueci',
        audience: 'users',
      },
    );
  
    // Verifique se o token foi gerado
    console.log('Token gerado:', token);
  
    // Armazene o código e o token no cache
    const success = this.recoveryCodeCache.set(recoveryCode, token, 1800);
    console.log('Código e token armazenados no cache:', { recoveryCode, token });
  
    if (!success) {
      throw new InternalServerErrorException('Erro ao armazenar o código de recuperação.');
    }
  
    await this.mailerService.sendMail({
      subject: 'Recuperação de senha',
      to: email,
      template: 'esqueci',
      context: {
        name: user.nome,
        code: recoveryCode,
      },
    });
  
    return true;
  }
  

async redefinir(dto: RedefinirDto) {
  const { senha, code } = dto;
  console.log({'code: ': code});

  try {
    const token = this.recoveryCodeCache.get<string>(code);
    console.log({'token: ': token});

    if (!token) {
      throw new BadRequestException('Código de recuperação inválido ou expirado.');
    }

    const data: any = this.jwtService.verify(token, {
      issuer: 'esqueci',
      audience: 'users',
    });
    console.log({'data: ': data});

    if (isNaN(Number(data.id))) {
      throw new BadRequestException('Token é inválido.');
    }

    const salt = await bcrypt.genSalt();
    const senhaHash = await bcrypt.hash(senha, salt);

    const user = await this.usuariosService._getByParams({
      id: Number(data.id),
    });
    console.log({'user: ': user});

    const senhaParaAtualizar = {
      ...user,
      senha: senhaHash,
    };

    await this.usuariosService.atualizarUsuario(user.id, senhaParaAtualizar);

    this.recoveryCodeCache.del(code);

    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  } catch (e) {
    throw new BadRequestException('Erro ao redefinir a senha: ' + e.message);
  }
}

  
}
