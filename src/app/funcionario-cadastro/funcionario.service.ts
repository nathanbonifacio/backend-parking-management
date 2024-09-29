/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Funcionario } from './entities/funcionario-cadastro.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriarFuncionarioDto } from './dto/criar-funcionaro.dto';
import { AtualizarFuncionarioDto } from './dto/atualizar-funcionario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class FuncionarioService extends BaseService<Funcionario> {
  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>,
  ) {
    super(funcionarioRepository);
  }

  async criarFuncionario(
    criarFuncionarioDto: CriarFuncionarioDto,
  ): Promise<CriarFuncionarioDto> {
    const existeFuncionario = await this._getByParams({
      cpfFuncionario: criarFuncionarioDto.cpfFuncionario,
    });
    if (!existeFuncionario)
      throw new BadRequestException('Funcionário já cadastrado');

    const senhaForte = (criarFuncionarioDto.senha = await bcrypt.hash(
      criarFuncionarioDto.senha,
      await bcrypt.genSalt(),
    ));
    if (!senhaForte) {
      throw new BadRequestException(
        'A senha deve conter pelo menos 8 caracteres, uma letra minúscula, uma letra maiúscula, um número e um caractere especial.',
      );
    }

    if (
      !(await bcrypt.compare(
        criarFuncionarioDto.confirmaSenha,
        senhaForte,
      ))
    ) {
      throw new BadRequestException('As senhas não coincidem.');
    }

    const funcionarioParaCriar = {
      ...criarFuncionarioDto,
    };

    const funcionario =
      await this.funcionarioRepository.save(funcionarioParaCriar);

    return funcionario;
  }

  async atualizarFuncionario(
    funcionarioId: number,
    atualizarFuncionarioDto: AtualizarFuncionarioDto,
  ): Promise<AtualizarFuncionarioDto> {
    const existeFuncionario = await this._getByParams({ id: funcionarioId });
    if (!existeFuncionario)
      throw new BadRequestException('Funcionário não cadastrado');

    if (atualizarFuncionarioDto.senha) {
      atualizarFuncionarioDto.senha = await bcrypt.hash(
        atualizarFuncionarioDto.senha,
        await bcrypt.genSalt(),
      );
    }

    const funcionarioParaAtualizar = {
      ...existeFuncionario,
      ...atualizarFuncionarioDto,
    };

    await this.funcionarioRepository.update(
      funcionarioId,
      funcionarioParaAtualizar,
    );

    return this._getByParams({ id: funcionarioId });
  }

  async deletarFuncionario(funcionarioId: number) {
    const existeFuncionario = await this._getByParams({ id: funcionarioId });
    if (!existeFuncionario)
      throw new BadRequestException('Funcionário não cadastrado');

    return this.funcionarioRepository.delete(funcionarioId);
  }
}
