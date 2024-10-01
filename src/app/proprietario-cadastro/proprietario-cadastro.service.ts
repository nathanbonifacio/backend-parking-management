import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository, Not } from 'typeorm';
import { Proprietario } from './entities/proprietario-cadastro.entity';
import { CriarProprietarioDto } from './dto/criar-proprietario.dto';
import * as bcrypt from 'bcrypt';
import { AtualizarProprietarioDto } from './dto/atualizar-proprietario.dto';

@Injectable()
export class ProprietarioService extends BaseService<Proprietario> {
  constructor(
    @InjectRepository(Proprietario)
    private readonly proprietarioRepository: Repository<Proprietario>,
  ) {
    super(proprietarioRepository);
  }

  async criarProprietario(
    criarProprietarioDto: CriarProprietarioDto,
  ): Promise<CriarProprietarioDto> {
    const existeProprietario = await this._getByParams({
      email: criarProprietarioDto.email,
    });
    if (existeProprietario) {
      throw new BadRequestException('Email e/ou CPF já cadastrado(s).');
    }

    const existeCPF = await this._getByParams({
      cpf: criarProprietarioDto.cpf,
    });
    if (existeCPF) {
      throw new BadRequestException('Email e/ou CPF já cadastrado(s).');
    }

    const isStrongPassword = (criarProprietarioDto.senha = await bcrypt.hash(
      criarProprietarioDto.senha,
      await bcrypt.genSalt(),
    ));
    if (!isStrongPassword) {
      throw new BadRequestException(
        'A senha deve conter pelo menos 8 caracteres, uma letra minúscula, uma letra maiúscula, um número e um caractere especial.',
      );
    }

    if (
      !(await bcrypt.compare(
        criarProprietarioDto.confirmaSenha,
        isStrongPassword,
      ))
    ) {
      throw new BadRequestException('As senhas não coincidem.');
    }

    const proprietarioParaCriar = {
      ...criarProprietarioDto,
    };

    const proprietario = await this.proprietarioRepository.save(
      proprietarioParaCriar,
    );

    return proprietario;
  }

  async atualizarProprietario(
    proprietarioId: number,
    atualizarProprietarioDto: AtualizarProprietarioDto,
  ) {
    const existePropritario = await this._getByParams({
      id: proprietarioId,
    });
    if (!existePropritario) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    if (atualizarProprietarioDto.email) {
      const proprietarioComEmail = await this._getByParams({
        email: atualizarProprietarioDto.email,
        id: Not(proprietarioId),
      });

      if (proprietarioComEmail) {
        throw new BadRequestException(atualizarProprietarioDto.email);
      }
    }

    if (atualizarProprietarioDto.cpf) {
      const existeCPF = await this._getByParams({
        cpf: atualizarProprietarioDto.cpf,
      });
      if (existeCPF) {
        throw new BadRequestException('CPF já cadastrado.');
      }
    }

    if (atualizarProprietarioDto.senha) {
      atualizarProprietarioDto.senha = await bcrypt.hash(
        atualizarProprietarioDto.senha,
        await bcrypt.genSalt(),
      );
    }

    const proprietarioParaAtualizar = {
      ...existePropritario,
      ...atualizarProprietarioDto,
    };

    const proprietarioAtualizado = await this.proprietarioRepository.update(
      proprietarioId,
      proprietarioParaAtualizar,
    );

    return proprietarioAtualizado;
  }

  async deletarProprietario(proprietarioId: number) {
    const existePropritario = await this._getByParams({
      id: proprietarioId,
    });
    if (!existePropritario) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    return this.proprietarioRepository.delete(proprietarioId);
  }
}
