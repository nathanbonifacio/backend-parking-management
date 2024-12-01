import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MensalistasModule } from '../cadastro-mensalista/cadastro-mensalista.module';
import { EstacionamentoModule } from '../estacionamento-cadastro/cadastro-estacionamento.module';
import { EntradaSaidaController } from './entrada-saida.controller';
import { EntradaSaida } from './entities/entrada-saida.entity';
import { EntradaSaidaService } from './entrada-saida.service';
import { VeiculosModule } from '../cadastro-veiculos/cadastro-veiculos.module';

@Module({
  controllers: [EntradaSaidaController],
  imports: [
    TypeOrmModule.forFeature([EntradaSaida]),
    MensalistasModule,
    EstacionamentoModule,
    VeiculosModule,
  ],
  providers: [EntradaSaidaService],
  exports: [EntradaSaidaService],
})
export class EntradaSaidaModule {}
