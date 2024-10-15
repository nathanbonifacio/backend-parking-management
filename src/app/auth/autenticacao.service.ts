import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FuncionarioService } from '../funcionario-cadastro/funcionario.service';
import { ProprietarioService } from '../proprietario-cadastro/proprietario-cadastro.service';
import { AutenticacaoLoginDto } from './dto/autenticacao-login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AutenticacaoService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly proprietarioService: ProprietarioService,
    private readonly funcionarioService: FuncionarioService,
  ) {}

  // async createToken() {
  //   return this.jwtService.sign();
  // }

  // async checkToken(token: string) {
  //   return this.jwtService.verify();
  // }

  async login(autenticacaoLogin: AutenticacaoLoginDto) {
    const existeProprietario = await this.proprietarioService._getByParams({
      email: autenticacaoLogin.email,
    });

    const existeFuncionario = await this.funcionarioService._getByParams({
      cpfFuncionario: autenticacaoLogin.cpfFuncionario,
    });

    if (autenticacaoLogin.email) {
      if (!existeProprietario.email) {
        throw new UnauthorizedException('Email e/ou senha incorretos.');
      }

      if (
        !(await bcrypt.compare(
          autenticacaoLogin.senha,
          existeProprietario.senha,
        ))
      ) {
        throw new UnauthorizedException('E-mail e/ou senha incorretos.');
      }

      return existeProprietario;
    }

    if (autenticacaoLogin.cpfFuncionario) {
      if (!existeFuncionario.cpfFuncionario) {
        throw new UnauthorizedException('CPF e/ou senha incorretos.');
      }

      if (
        !(await bcrypt.compare(
          autenticacaoLogin.senha,
          existeFuncionario.senha,
        ))
      ) {
        throw new UnauthorizedException('CPF e/ou senha incorretos.');
      }

      return existeFuncionario;
    }
  }

  /* async esqueceuSenha(email?: string, cpfFuncionario?: string) {
    let usuario;

    if (email) {
      usuario = await this.proprietarioService._getByParams({ email });
      if (!usuario) {
        throw new NotFoundException(
          'Proprietário não encontrado com este email.',
        );
      }
    } else if (cpfFuncionario) {
      usuario = await this.funcionarioService._getByParams({ cpfFuncionario });
      if (!usuario) {
        throw new NotFoundException('Funcionário não encontrado com este CPF.');
      }
    } else {
      throw new NotFoundException('Email ou CPF devem ser fornecidos.');
    }

    // Aqui você pode enviar um e-mail com o link para redefinir a senha ou gerar um token
    return 'Email ou instruções enviadas para redefinir a senha.';
  }

  async redefinirSenha(
    email?: string,
    cpfFuncionario?: string,
    novaSenha?: string,
  ) {
    let usuario;

    if (email) {
      usuario = await this.proprietarioService._getByParams({ email });
      if (!usuario) {
        throw new NotFoundException(
          'Proprietário não encontrado com este email.',
        );
      }
    } else if (cpfFuncionario) {
      usuario = await this.funcionarioService._getByParams({ cpfFuncionario });
      if (!usuario) {
        throw new NotFoundException('Funcionário não encontrado com este CPF.');
      }
    } else {
      throw new NotFoundException('Email ou CPF devem ser fornecidos.');
    }

    // Gerar hash da nova senha
    const hashedSenha = await bcrypt.hash(novaSenha, 10);

    // Atualizar a senha dependendo se é proprietário ou funcionário
    if (email) {
      await this.proprietarioService.update(usuario.id, hashedSenha);
    } else if (cpfFuncionario) {
      await this.funcionarioService.update(usuario.id, hashedSenha);
    }

    return 'Senha redefinida com sucesso.';
  } */
}
