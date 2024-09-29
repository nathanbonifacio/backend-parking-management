import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EstacionamentoService } from './cadastro-estacionamento.service';

@ApiTags('Estacionamento')
@Controller('/estacionamento')
export class EstacionamentoController {
  constructor(private readonly estacionamntoService: EstacionamentoService) {}
}
