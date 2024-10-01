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
      entities: [Proprietario, Funcionario],
      synchronize: false,
      logging: true,
    }),
    ProprietarioModule,
    FuncionarioModule,
    EstacionamentoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
