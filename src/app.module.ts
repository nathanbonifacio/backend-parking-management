import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProprietarioModule } from './app/proprietario-cadastro/proprietario-cadastro.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FuncionarioModule } from './app/funcionario-cadastro/funcionario.module';

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
    }),
    ProprietarioModule,
    FuncionarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
