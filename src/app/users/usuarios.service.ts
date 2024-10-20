import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Not, Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CriarUsuariosDto } from './dto/criar-usuarios.dto';
import * as bcrypt from 'bcrypt';
import { AtualizarUsuarioDto } from './dto/atualizar-usuarios.dto';
import { UsuarioTipoEnum } from './enum/usuario-tipo.enum';

@Injectable()
export class UsuariosService extends BaseService<Usuario> {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {
    super(usuarioRepository);
  }

  async criarUsuario(
    criarUsuariosDto: CriarUsuariosDto,
  ): Promise<CriarUsuariosDto> {
    const existeUsuario = await this._getByParams({
      email: criarUsuariosDto.email,
    });
    if (existeUsuario) {
      throw new BadRequestException('Email e/ou CPF já cadastrado(s).');
    }

    const existeCPF = await this._getByParams({
      cpf: criarUsuariosDto.cpf,
    });
    if (existeCPF) {
      throw new BadRequestException('Email e/ou CPF já cadastrado(s).');
    }

    if (criarUsuariosDto.senha !== criarUsuariosDto.confirmaSenha) {
      throw new BadRequestException('As senhas não coincidem.');
    }

    const isStrongPassword = (criarUsuariosDto.senha = await bcrypt.hash(
      criarUsuariosDto.senha,
      await bcrypt.genSalt(),
    ));
    if (!isStrongPassword) {
      throw new BadRequestException(
        'A senha deve conter pelo menos 8 caracteres, uma letra minúscula, uma letra maiúscula, um número e um caractere especial.',
      );
    }

    criarUsuariosDto.confirmaSenha = await bcrypt.hash(
      criarUsuariosDto.confirmaSenha,
      await bcrypt.genSalt(),
    );

    const usuarioParaCriar = {
      ...criarUsuariosDto,
      tipo: UsuarioTipoEnum.PROPRIETARIO,
    };

    const usuario = await this.usuarioRepository.save(usuarioParaCriar);

    return usuario;
  }

  async atualizarUsuario(
    usuarioId: number,
    atualizarUsuariosDto: AtualizarUsuarioDto,
  ) {
    const existeUsuario = await this._getByParams({
      id: usuarioId,
    });
    if (!existeUsuario) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    if (atualizarUsuariosDto.email) {
      const proprietarioComEmail = await this._getByParams({
        email: atualizarUsuariosDto.email,
        id: Not(usuarioId),
      });

      if (proprietarioComEmail) {
        throw new BadRequestException(atualizarUsuariosDto.email);
      }
    }

    if (atualizarUsuariosDto.cpf) {
      const existeCPF = await this._getByParams({
        cpf: atualizarUsuariosDto.cpf,
      });
      if (existeCPF) {
        throw new BadRequestException('CPF já cadastrado.');
      }
    }

    if (atualizarUsuariosDto.senha) {
      atualizarUsuariosDto.senha = await bcrypt.hash(
        atualizarUsuariosDto.senha,
        await bcrypt.genSalt(),
      );
    }

    const usuarioParaAtualizar = {
      ...existeUsuario,
      ...atualizarUsuariosDto,
      updatedAt: new Date(),
    };

    const usuarioAtualizado = await this.usuarioRepository.update(
      usuarioId,
      usuarioParaAtualizar,
    );

    return usuarioAtualizado;
  }

  async deletarUsuario(usuarioId: number) {
    const existeUsuario = await this._getByParams({
      id: usuarioId,
    });
    if (!existeUsuario) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    return this.usuarioRepository.delete(usuarioId);
  }
}
