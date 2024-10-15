/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { AutenticacaoLoginDto } from './dto/autenticacao-login.dto';
import { AutenticacaoService } from './autenticacao.service';

@Controller('auth')
export class AutenticacaoController {
    constructor(
        private readonly autenticacaoService: AutenticacaoService,
    ) {}

  @Post('login')
  login(@Body() login: AutenticacaoLoginDto) {
    return this.autenticacaoService.login(login);
  }

  // @Post('forget')
  // async esqueci(@Body() esqueci: EsqueciSenhaDto) {}

  // @Post('reset')
  // async redefinir(@Body() redefinir: RedefinirDto) {}
}
