import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { EntradaSaidaService } from './entrada-saida.service';
import { RegistrarEntradasESaidasDto } from './dto/registrar-entrada-saida.dto';
import { EntradaSaida } from './entities/entrada-saida.entity';
import { AtualizarEntradasESaidasDto } from './dto/atualizar-entrada-saida.dto';

@ApiTags('EntradaSaida')
@Controller('entradaSaida')
export class EntradaSaidaController {
  constructor(private readonly entradaSaidaService: EntradaSaidaService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar entrada e saída.' })
  @ApiCreatedResponse({
    type: RegistrarEntradasESaidasDto,
    description: 'Valor retornado toda vez que é cadastrado com sucesso.',
  })
  @ApiUnprocessableEntityResponse({
    type: null,
    description:
      'Erro lançado toda vez que um campo é preenchido incorretamente.',
  })
  async registrarEntradaSaida(@Body() registrar: RegistrarEntradasESaidasDto) {
    return this.entradaSaidaService.cadastrarEntradaSaida(registrar);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma entrada e saida pelo ID.' })
  @ApiOkResponse({
    type: AtualizarEntradasESaidasDto,
    description: 'Valor retornado toda vez que é atualizado com sucesso.',
  })
  @ApiUnprocessableEntityResponse({
    type: null,
    description:
      'Erro lançado toda vez que um campo é preenchido incorretamente.',
  })
  @ApiNotFoundResponse({
    description:
      'Erro lançado toda vez que um registro a ser atualizado não existe.',
  })
  async atualizarEntradaSaida(
    @Param('id') id: number,
    @Body() atualizar: AtualizarEntradasESaidasDto,
  ) {
    return this.entradaSaidaService.atualizarEntradaSaida(id, atualizar);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um registro pelo Id.' })
  @ApiNoContentResponse({
    description:
      'Valor retornado toda vez que um registro é deletado com sucesso.',
  })
  @ApiNotFoundResponse({
    description:
      'Erro lançado toda vez que um registro a ser deletado não existe.',
  })
  deletarRegistro(@Param('id') id: number) {
    return this.entradaSaidaService.deletarRegistro(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Encontra um registro pelo Id.' })
  @ApiOkResponse({
    type: EntradaSaida,
    description:
      'Valor retornado toda vez que o Id de um registro é encontrado.',
  })
  @ApiNotFoundResponse({
    description: 'Erro lançado toda vez que um proprietário não é encontrado.',
  })
  findOne(@Param('id') id: number) {
    return this.entradaSaidaService.find(id);
  }
}
