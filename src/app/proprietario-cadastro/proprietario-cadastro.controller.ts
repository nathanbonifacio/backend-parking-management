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
import { AtualizarProprietarioDto } from './dto/atualizar-proprietario.dto';
import { CriarProprietarioDto } from './dto/criar-proprietario.dto';
import { Proprietario } from './entities/proprietario-cadastro.entity';
import { ProprietarioService } from './proprietario-cadastro.service';

@ApiTags('Proprietarios')
@Controller('proprietarios')
export class ProprietariosController {
  constructor(private readonly proprietariosService: ProprietarioService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo proprietario.' })
  @ApiCreatedResponse({
    type: CriarProprietarioDto,
    description:
      'Valor retornado toda vez que um proprietario é cadastrado com sucesso.',
  })
  @ApiUnprocessableEntityResponse({
    type: null,
    description:
      'Erro lançado toda vez que um campo é preenchido incorretamente.',
  })
  async criarProprietario(
    @Body() criarProprietarioDto: CriarProprietarioDto,
  ): Promise<CriarProprietarioDto> {
    return this.proprietariosService.criarProprietario(criarProprietarioDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um proprietario pelo Id.' })
  @ApiOkResponse({
    type: AtualizarProprietarioDto,
    description:
      'Valor retornado toda vez que um proprietario é atualizado com sucesso.',
  })
  @ApiUnprocessableEntityResponse({
    type: null,
    description:
      'Erro lançado toda vez que um campo é preenchido incorretamente.',
  })
  @ApiNotFoundResponse({
    description:
      'Erro lançado toda vez que um proprietario a ser atualizado não existe.',
  })
  async atualizarProprietario(
    @Param('id') proprietarioId: number,
    @Body() atualizarProprietarioDto: AtualizarProprietarioDto,
  ) {
    return this.proprietariosService.atualizarProprietario(
      proprietarioId,
      atualizarProprietarioDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um proprietario pelo Id.' })
  @ApiNoContentResponse({
    description:
      'Valor retornado toda vez que um proprietario é deletado com sucesso.',
  })
  @ApiNotFoundResponse({
    description:
      'Erro lançado toda vez que um proprietario a ser deletado não existe.',
  })
  deletarProprietario(@Param('id') proprietarioId: number) {
    return this.proprietariosService.deletarProprietario(proprietarioId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Encontra um proprietario pelo Id.' })
  @ApiOkResponse({
    type: Proprietario,
    description:
      'Valor retornado toda vez que o Id de um proprietario é encontrado.',
  })
  @ApiNotFoundResponse({
    description: 'Erro lançado toda vez que um proprietário não é encontrado.',
  })
  findOne(@Param('id') proprietarioId: number) {
    return this.proprietariosService.find(proprietarioId);
  }
}
