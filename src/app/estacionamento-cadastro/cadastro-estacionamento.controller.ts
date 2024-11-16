import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
import { EstacionamentoService } from './cadastro-estacionamento.service';
import { CadastrarEstacionamentoDto } from './dto/cadastrar-estacionamento.dto';
import { AtualizarCadastroEstacionamento } from './dto/atualizar-estacionamento.dto';
import { Estacionamento } from './entities/cadastro-estacionamento.entity';
import { SearchInput } from 'src/common/dto/search-input.dto';
import { SearchResult } from 'src/common/dto/search-result.dto';

@ApiTags('Estacionamento')
@Controller('estacionamento')
export class EstacionamentoController {
  constructor(private readonly estacionamntoService: EstacionamentoService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo estacionamento.' })
  @ApiCreatedResponse({
    type: CadastrarEstacionamentoDto,
    description:
      'Valor retornado toda vez que um estacionamento é cadastrado com sucesso.',
  })
  @ApiUnprocessableEntityResponse({
    type: null,
    description:
      'Erro lançado toda vez que um campo é preenchido incorretamente.',
  })
  async cadastrarEstacionamento(
    @Body() cadastrarEstacionamentoDto: CadastrarEstacionamentoDto,
  ): Promise<CadastrarEstacionamentoDto> {
    return this.estacionamntoService.cadastrarEstacionamento(
      cadastrarEstacionamentoDto,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um estacionamento pelo Id.' })
  @ApiOkResponse({
    type: AtualizarCadastroEstacionamento,
    description:
      'Valor retornado toda vez que um estacionamento é atualizado com sucesso.',
  })
  @ApiUnprocessableEntityResponse({
    type: null,
    description:
      'Erro lançado toda vez que um campo é preenchido incorretamente.',
  })
  @ApiNotFoundResponse({
    description:
      'Erro lançado toda vez que um estacionamento a ser atualizado não existe.',
  })
  async atualizarEstacionamento(
    @Param('id') id: number,
    @Body() atualizarEstacionamentoDto: AtualizarCadastroEstacionamento,
  ): Promise<AtualizarCadastroEstacionamento> {
    return this.estacionamntoService.atualizarestacionamento(
      id,
      atualizarEstacionamentoDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um estacionamento pelo Id.' })
  @ApiNoContentResponse({
    description:
      'Valor retornado toda vez que um estacionamento é deletado com sucesso.',
  })
  @ApiNotFoundResponse({
    description:
      'Erro lançado toda vez que um estacionamento a ser deletado não existe.',
  })
  async deletarEstacionamento(@Param('id') id: number) {
    return this.estacionamntoService.deletarEstacionamento(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Encontra um funcionario pelo Id.' })
  @ApiOkResponse({
    type: Estacionamento,
    description:
      'Valor retornado toda vez que o Id de um funcionario é encontrado.',
  })
  @ApiNotFoundResponse({
    description: 'Erro lançado toda vez que um proprietário não é encontrado.',
  })
  findOne(@Param('id') id: number) {
    return this.estacionamntoService.find(id);
  }
}
