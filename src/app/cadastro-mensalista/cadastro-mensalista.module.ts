import { Module } from '@nestjs/common';
import { MensalistasController } from './cadastro-mensalista.controller';
import { Mensalistas } from './entities/cadastro-mensalista.entity';
import { MensalistasService } from './cadastro-mensalista.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [MensalistasController],
  imports: [TypeOrmModule.forFeature([Mensalistas])],
  providers: [MensalistasService],
  exports: [MensalistasService],
})
export class MensalistasModule {}
