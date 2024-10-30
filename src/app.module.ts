import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstacionamentoModule } from './app/estacionamento-cadastro/cadastro-estacionamento.module';
import { Estacionamento } from './app/estacionamento-cadastro/entities/cadastro-estacionamento.entity';
import { AutenticacaoModule } from './app/auth/autenticacao.module';
import { UsuarioModule } from './app/users/usuarios.module';
import { Usuario } from './app/users/entities/usuario.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MensalistasModule } from './app/cadastro-mensalista/cadastro-mensalista.module';
import { Mensalistas } from './app/cadastro-mensalista/entities/cadastro-mensalista.entity';

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
      entities: [Estacionamento, Usuario, Mensalistas],
      synchronize: false,
      logging: true,
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'darian.sauer69@ethereal.email',
            pass: 'JRAQX27R4bunW5YM2W'
        }
      },
      defaults: {
        from: '"nest-modules" <darian.sauer69@ethereal.email>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    EstacionamentoModule,
    AutenticacaoModule,
    UsuarioModule,
    MensalistasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
