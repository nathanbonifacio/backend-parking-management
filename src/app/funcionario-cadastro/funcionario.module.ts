import { Module } from '@nestjs/common';
import { FuncionarioController } from './funcionario.controller';
import { FuncionarioService } from './funcionario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcionario } from './entities/funcionario-cadastro.entity';
import { ProprietarioModule } from '../proprietario-cadastro/proprietario-cadastro.module';

@Module({
  controllers: [FuncionarioController],
  imports: [TypeOrmModule.forFeature([Funcionario]), ProprietarioModule],
  exports: [FuncionarioService],
  providers: [FuncionarioService],
})
export class FuncionarioModule {}
