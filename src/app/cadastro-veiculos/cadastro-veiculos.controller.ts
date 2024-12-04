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
import { VeiculossService } from './cadastro-veiculos.service';
import { CadastrarVeiculosDto } from './dto/cadastro-veiculos.dto';
import { AtualizarVeiculosDto } from './dto/atualizar-veiculo.dto';
import { Veiculos } from './entities/veiculos.entity';

@ApiTags('Veiculos')
@Controller('veiculos')
export class VeiculosController {
  constructor(private readonly veiculosService: VeiculossService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar um veiculo.' })
  @ApiCreatedResponse({
    type: CadastrarVeiculosDto,
    description:
      'Valor retornado toda vez que um veiculo é cadastrado com sucesso.',
  })
  @ApiUnprocessableEntityResponse({
    type: null,
    description:
      'Erro lançado toda vez que um campo é preenchido incorretamente.',
  })
  async cadastrarVeiculos(@Body() cadastrarVeiculo: CadastrarVeiculosDto) {
    return this.veiculosService.cadastrarVeiculo(cadastrarVeiculo);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um veiculo pelo Id.' })
  @ApiOkResponse({
    type: AtualizarVeiculosDto,
    description:
      'Valor retornado toda vez que um veiculo é atualizado com sucesso.',
  })
  @ApiUnprocessableEntityResponse({
    type: null,
    description:
      'Erro lançado toda vez que um campo é preenchido incorretamente.',
  })
  @ApiNotFoundResponse({
    description:
      'Erro lançado toda vez que um veiculo a ser atualizado não existe.',
  })
  async atualizarVeiculo(
    @Param('id') veiculoId: number,
    @Body() atualizarVeiculo: AtualizarVeiculosDto,
  ) {
    return this.veiculosService.atualizarVeiculo(veiculoId, atualizarVeiculo);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um veículo pelo Id.' })
  @ApiNoContentResponse({
    description:
      'Valor retornado toda vez que um veículo é deletado com sucesso.',
  })
  @ApiNotFoundResponse({
    description:
      'Erro lançado toda vez que um veículo a ser deletado não existe.',
  })
  deletarVeiculo(@Param('id') veiculoId: number) {
    return this.veiculosService.deletarVeiculo(veiculoId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Encontra um veículo pelo Id.' })
  @ApiOkResponse({
    type: Veiculos,
    description:
      'Valor retornado toda vez que o Id de um veículo é encontrado.',
  })
  @ApiNotFoundResponse({
    description: 'Erro lançado toda vez que um proprietário não é encontrado.',
  })
  findOne(@Param('id') veiculoId: number) {
    return this.veiculosService.find(veiculoId);
  }

  @Get('/getall/:id')
  async findAll(@Param('id') id: string): Promise<Veiculos[]> {
    return this.veiculosService.findAll(Number(id));
  }
}
