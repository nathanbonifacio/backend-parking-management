import { Module } from '@nestjs/common';
import { FuncionarioController } from './funcionario.controller';
import { FuncionarioService } from './funcionario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcionario } from './entities/funcionario-cadastro.entity';

@Module({
  controllers: [FuncionarioController],
  imports: [TypeOrmModule.forFeature([Funcionario])],
  exports: [FuncionarioService],
  providers: [FuncionarioService],
})
export class FuncionarioModule {}
