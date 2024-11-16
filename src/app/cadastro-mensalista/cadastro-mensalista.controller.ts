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
import { MensalistasService } from './cadastro-mensalista.service';
import { CriarCadastroMensalistaDto } from './dto/criar-cadastro-mensalista.dto';
import { AtualizarCadastroMensalistaDto } from './dto/atualizar-cadastro-mensalista.dto';
import { Mensalistas } from './entities/cadastro-mensalista.entity';

@ApiTags('Mensalistas')
@Controller('mensalistas')
export class MensalistasController {
  constructor(private readonly mensalistasService: MensalistasService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo mensalista.' })
  @ApiCreatedResponse({
    type: CriarCadastroMensalistaDto,
    description:
      'Valor retornado toda vez que um mensalista é cadastrado com sucesso.',
  })
  @ApiUnprocessableEntityResponse({
    type: null,
    description:
      'Erro lançado toda vez que um campo é preenchido incorretamente.',
  })
  async cadastrarMensalista(
    @Body() cadastrarMensalista: CriarCadastroMensalistaDto,
  ) {
    return this.mensalistasService.cadastrarMensalistas(cadastrarMensalista);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um mensalista pelo Id.' })
  @ApiOkResponse({
    type: AtualizarCadastroMensalistaDto,
    description:
      'Valor retornado toda vez que um mensalista é atualizado com sucesso.',
  })
  @ApiUnprocessableEntityResponse({
    type: null,
    description:
      'Erro lançado toda vez que um campo é preenchido incorretamente.',
  })
  @ApiNotFoundResponse({
    description:
      'Erro lançado toda vez que um mensalista a ser atualizado não existe.',
  })
  async atualizarMensalista(
    @Param('id') mensalistaId: number,
    @Body() atualizarMensalista: AtualizarCadastroMensalistaDto,
  ) {
    return this.mensalistasService.atualizarMensalista(
      mensalistaId,
      atualizarMensalista,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um mensalista pelo Id.' })
  @ApiNoContentResponse({
    description:
      'Valor retornado toda vez que um mensalista é deletado com sucesso.',
  })
  @ApiNotFoundResponse({
    description:
      'Erro lançado toda vez que um mensalista a ser deletado não existe.',
  })
  deletarUsuario(@Param('id') mensalistaId: number) {
    return this.mensalistasService.deletarMensalista(mensalistaId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Encontra um mensalistas pelo Id.' })
  @ApiOkResponse({
    type: Mensalistas,
    description:
      'Valor retornado toda vez que o Id de um mensalistas é encontrado.',
  })
  @ApiNotFoundResponse({
    description: 'Erro lançado toda vez que um proprietário não é encontrado.',
  })
  findOne(@Param('id') mensalistaId: number) {
    return this.mensalistasService.find(mensalistaId);
  }
}
