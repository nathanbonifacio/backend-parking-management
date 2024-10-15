import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AutenticacaoController } from './autenticacao.controller';
import { ProprietarioModule } from '../proprietario-cadastro/proprietario-cadastro.module';
import { FuncionarioModule } from '../funcionario-cadastro/funcionario.module';
import { AutenticacaoService } from './autenticacao.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'FTqp0xrH<SM[L|6X%w(>zhfoTADm;KTL',
    }),
    ProprietarioModule,
    FuncionarioModule,
  ],
  controllers: [AutenticacaoController],
  exports: [AutenticacaoService],
  providers: [AutenticacaoService],
})
export class AutenticacaoModule {}