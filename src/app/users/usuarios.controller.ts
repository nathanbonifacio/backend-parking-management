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
import { UsuariosService } from './usuarios.service';
import { CriarUsuariosDto } from './dto/criar-usuarios.dto';
import { AtualizarUsuarioDto } from './dto/atualizar-usuarios.dto';
import { Usuario } from './entities/usuario.entity';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário.' })
  @ApiCreatedResponse({
    type: CriarUsuariosDto,
    description:
      'Valor retornado toda vez que um usuário é cadastrado com sucesso.',
  })
  @ApiUnprocessableEntityResponse({
    type: null,
    description:
      'Erro lançado toda vez que um campo é preenchido incorretamente.',
  })
  async criarProprietario(
    @Body() criarUsuariosDto: CriarUsuariosDto,
  ): Promise<CriarUsuariosDto> {
    return this.usuariosService.criarUsuario(criarUsuariosDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um usuário pelo Id.' })
  @ApiOkResponse({
    type: AtualizarUsuarioDto,
    description:
      'Valor retornado toda vez que um usuário é atualizado com sucesso.',
  })
  @ApiUnprocessableEntityResponse({
    type: null,
    description:
      'Erro lançado toda vez que um campo é preenchido incorretamente.',
  })
  @ApiNotFoundResponse({
    description:
      'Erro lançado toda vez que um usuário a ser atualizado não existe.',
  })
  async atualizarUsuarios(
    @Param('id') usuarioId: number,
    @Body() atualizarUsuariosDto: AtualizarUsuarioDto,
  ) {
    return this.usuariosService.atualizarUsuario(
      usuarioId,
      atualizarUsuariosDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um usuário pelo Id.' })
  @ApiNoContentResponse({
    description:
      'Valor retornado toda vez que um usuário é deletado com sucesso.',
  })
  @ApiNotFoundResponse({
    description:
      'Erro lançado toda vez que um usuário a ser deletado não existe.',
  })
  deletarUsuario(@Param('id') usuarioId: number) {
    return this.usuariosService.deletarUsuario(usuarioId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Encontra um usuário pelo Id.' })
  @ApiOkResponse({
    type: Usuario,
    description:
      'Valor retornado toda vez que o Id de um usuário é encontrado.',
  })
  @ApiNotFoundResponse({
    description: 'Erro lançado toda vez que um proprietário não é encontrado.',
  })
  findOne(@Param('id') usuarioId: number) {
    return this.usuariosService.find(usuarioId);
  }
}
