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
import { FuncionarioService } from './funcionario.service';
import { CriarFuncionarioDto } from './dto/criar-funcionaro.dto';
import { AtualizarFuncionarioDto } from './dto/atualizar-funcionario.dto';
import { Funcionario } from './entities/funcionario-cadastro.entity';

@ApiTags('Funcionarios')
@Controller('funcionarios')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo funcionario.' })
  @ApiCreatedResponse({
    type: CriarFuncionarioDto,
    description:
      'Valor retornado toda vez que um funcionario é cadastrado com sucesso.',
  })
  @ApiUnprocessableEntityResponse({
    type: null,
    description:
      'Erro lançado toda vez que um campo é preenchido incorretamente.',
  })
  async criarFuncionario(
    @Body() criarFuncionarioDto: CriarFuncionarioDto,
  ): Promise<CriarFuncionarioDto> {
    return this.funcionarioService.criarFuncionario(criarFuncionarioDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um funcionario pelo Id.' })
  @ApiOkResponse({
    type: AtualizarFuncionarioDto,
    description:
      'Valor retornado toda vez que um funcionario é atualizado com sucesso.',
  })
  @ApiUnprocessableEntityResponse({
    type: null,
    description:
      'Erro lançado toda vez que um campo é preenchido incorretamente.',
  })
  @ApiNotFoundResponse({
    description:
      'Erro lançado toda vez que um funcionario a ser atualizado não existe.',
  })
  async atualizarFuncionario(
    @Param('id') funcionarioId: number,
    @Body() atualizarFuncionarioDto: AtualizarFuncionarioDto,
  ): Promise<AtualizarFuncionarioDto> {
    return this.funcionarioService.atualizarFuncionario(
      funcionarioId,
      atualizarFuncionarioDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um funcionario pelo Id.' })
  @ApiNoContentResponse({
    description:
      'Valor retornado toda vez que um funcionario é deletado com sucesso.',
  })
  @ApiNotFoundResponse({
    description:
      'Erro lançado toda vez que um funcionario a ser deletado não existe.',
  })
  async deletarFuncionario(@Param('id') funcionarioId: number) {
    return this.funcionarioService.deletarFuncionario(funcionarioId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Encontra um funcionario pelo Id.' })
  @ApiOkResponse({
    type: Funcionario,
    description:
      'Valor retornado toda vez que o Id de um funcionario é encontrado.',
  })
  @ApiNotFoundResponse({
    description: 'Erro lançado toda vez que um proprietário não é encontrado.',
  })
  findOne(@Param('id') funcionarioId: number) {
    return this.funcionarioService.find(funcionarioId);
  }
}
