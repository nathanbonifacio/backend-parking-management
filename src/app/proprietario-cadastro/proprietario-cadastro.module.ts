import { Module } from '@nestjs/common';
import { ProprietariosController } from './proprietario-cadastro.controller';
import { ProprietarioService } from './proprietario-cadastro.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proprietario } from './entities/proprietario-cadastro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proprietario])],
  controllers: [ProprietariosController],
  providers: [ProprietarioService],
  exports: [ProprietarioService],
})
export class ProprietarioModule {}
