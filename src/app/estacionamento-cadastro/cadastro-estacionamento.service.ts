import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Estacionamento } from './entities/cadastro-estacionamento.entity';
import { Repository } from 'typeorm';
import { ProprietarioService } from '../proprietario-cadastro/proprietario-cadastro.service';
import { FuncionarioService } from '../funcionario-cadastro/funcionario.service';
import { CadastrarEstacionamentoDto } from './dto/cadastrar-estacionamento.dto';
import { AtualizarCadastroEstacionamento } from './dto/atualizar-estacionamento.dto';

@Injectable()
export class EstacionamentoService extends BaseService<Estacionamento> {
  constructor(
    @InjectRepository(Estacionamento)
    private readonly estacionamentoRepository: Repository<Estacionamento>,
    private readonly proprietarioService: ProprietarioService,
    private readonly funcionarioService: FuncionarioService,
  ) {
    super(estacionamentoRepository);
  }

  async cadastrarEstacionamento(
    cadastrarEstacionamento: CadastrarEstacionamentoDto,
  ): Promise<Estacionamento> {
    const existeProprietario = await this.proprietarioService._getByParams({
      cpf: cadastrarEstacionamento.cpfFuncionario,
    });
    if (!existeProprietario)
      throw new BadRequestException('CPF do proprietario não existe!');

    const existeFuncionario = await this.funcionarioService._getByParams({
      cpfFuncionario: cadastrarEstacionamento.cpfFuncionario,
    });
    if (!existeFuncionario)
      throw new BadRequestException('CPF do funcionário não existe!');

    const estacionamento = await this.estacionamentoRepository.save(
      cadastrarEstacionamento,
    );
    return estacionamento;
  }

  async atualizarestacionamento(
    id: number,
    atualizarEstacionamento: AtualizarCadastroEstacionamento,
  ): Promise<Estacionamento> {
    const existeEstacionamento = await this._getByParams({
      id: id,
    });
    if (!existeEstacionamento)
      throw new BadRequestException('Estacionamento não existe!');

    if (atualizarEstacionamento.cpfProprietario) {
      const existeProprietario = await this.proprietarioService._getByParams({
        cpf: atualizarEstacionamento.cpfFuncionario,
      });
      if (!existeProprietario)
        throw new BadRequestException('CPF do proprietario não existe!');
    }

    if (atualizarEstacionamento.cpfFuncionario) {
      const existeFuncionario = await this.funcionarioService._getByParams({
        cpfFuncionario: atualizarEstacionamento.cpfFuncionario,
      });
      if (!existeFuncionario)
        throw new BadRequestException('CPF do funcionário não existe!');
    }

    await this.estacionamentoRepository.update(id, atualizarEstacionamento);

    return this._getByParams({ id: id });
  }

  async deletarEstacionamento(id: number) {
    const existeEstacionamento = await this._getByParams({
      id: id,
    });
    if (!existeEstacionamento)
      throw new BadRequestException('Estacionamento não existe!');

    return await this.estacionamentoRepository.delete(id);
  }
}
