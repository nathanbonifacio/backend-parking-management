import { Module } from '@nestjs/common';
import { EstacionamentoController } from './cadastro-estacionamento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estacionamento } from './entities/cadastro-estacionamento.entity';
import { EstacionamentoService } from './cadastro-estacionamento.service';
import { ProprietarioModule } from '../proprietario-cadastro/proprietario-cadastro.module';
import { FuncionarioModule } from '../funcionario-cadastro/funcionario.module';

@Module({
  controllers: [EstacionamentoController],
  imports: [
    TypeOrmModule.forFeature([Estacionamento]),
    ProprietarioModule,
    FuncionarioModule,
  ],
  providers: [EstacionamentoService],
  exports: [EstacionamentoService],
})
export class EstacionamentoModule {}
