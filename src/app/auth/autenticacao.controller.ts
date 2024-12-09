/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { CriarUsuariosDto } from '../users/dto/criar-usuarios.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { EsqueciSenhaDto } from './dto/esqueci-senha.dto';
import { RedefinirDto } from './dto/redefinir.dto';

@Controller('auth')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Post('login')
  @ApiOperation({ summary: 'Realiza o login de um usuário.' })
  @ApiCreatedResponse({
    description:
      'Valor retornado toda vez que um usuário é encontrado e o login é realizado.',
  })
  @ApiUnprocessableEntityResponse({
    type: null,
    description:
      'Erro lançado toda vez que um campo é preenchido incorretamente e não é efetuado o login.',
  })
  async login(@Body() body) {
    const user = await this.autenticacaoService.validateUser(
      body.email,
      body.senha,
    );
    if (!user) {
      throw new UnauthorizedException('Email ou senha incorretos.');
    }
    return this.autenticacaoService.login(user);
  }

  @Post('register')
  @ApiOperation({ summary: 'Cria um novo usuário.' })
  @ApiCreatedResponse({
    type: CriarUsuariosDto,
    description:
      'Valor retornado toda vez que um usuário é cadastrado com sucesso.',
  })
  @ApiUnprocessableEntityResponse({
    type: null,
    description:
      'Erro lançado toda vez que um campo é preenchido incorretamente.',
  })
  async register(@Body() criarUsuariosDto: CriarUsuariosDto) {
    return this.autenticacaoService.register(criarUsuariosDto);
  }

  @Post('esqueci')
  async esqueci(@Body() { email }: EsqueciSenhaDto) {
    return this.autenticacaoService.esqueciSenha(email);
  }

  @Post('redefinir')
  async redefinir(@Body() dto: RedefinirDto) {
    return this.autenticacaoService.redefinir(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('protected')
  async getProtectedResource(@Request() req) {
    return { message: `Olá, ${req.user.username}` };
  }
}
