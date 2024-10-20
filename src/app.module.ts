import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProprietarioModule } from './app/proprietario-cadastro/proprietario-cadastro.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuncionarioModule } from './app/funcionario-cadastro/funcionario.module';
import { EstacionamentoModule } from './app/estacionamento-cadastro/cadastro-estacionamento.module';
import { Proprietario } from './app/proprietario-cadastro/entities/proprietario-cadastro.entity';
import { Funcionario } from './app/funcionario-cadastro/entities/funcionario-cadastro.entity';
import { Estacionamento } from './app/estacionamento-cadastro/entities/cadastro-estacionamento.entity';
import { AutenticacaoModule } from './app/auth/autenticacao.module';
import { UsuarioModule } from './app/users/usuarios.module';
import { Usuario } from './app/users/entities/usuario.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'parking_management',
      entities: [Estacionamento, Usuario],
      synchronize: false,
      logging: true,
    }),
    EstacionamentoModule,
    AutenticacaoModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
