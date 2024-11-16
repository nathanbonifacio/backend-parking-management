import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VeiculosController } from './cadastro-veiculos.controller';
import { Veiculos } from './entities/veiculos.entity';
import { VeiculossService } from './cadastro-veiculos.service';
import { MensalistasModule } from '../cadastro-mensalista/cadastro-mensalista.module';
import { EstacionamentoModule } from '../estacionamento-cadastro/cadastro-estacionamento.module';

@Module({
  controllers: [VeiculosController],
  imports: [
    TypeOrmModule.forFeature([Veiculos]),
    MensalistasModule,
    EstacionamentoModule,
  ],
  providers: [VeiculossService],
  exports: [VeiculossService],
})
export class VeiculosModule {}
