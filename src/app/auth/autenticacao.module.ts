import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AutenticacaoController } from './autenticacao.controller';
import { AutenticacaoService } from './autenticacao.service';
import { UsuarioModule } from '../users/usuarios.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'FTqp0xrH<SM[L|6X%w(>zhfoTADm;KTL',
      signOptions: { expiresIn: '1h' },
    }),
    UsuarioModule,
    PassportModule,
  ],
  controllers: [AutenticacaoController],
  exports: [AutenticacaoService],
  providers: [AutenticacaoService, JwtStrategy],
})
export class AutenticacaoModule {}
