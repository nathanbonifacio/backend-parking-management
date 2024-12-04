import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Veiculos } from './entities/veiculos.entity';
import { AtualizarVeiculosDto } from './dto/atualizar-veiculo.dto';
import { CadastrarVeiculosDto } from './dto/cadastro-veiculos.dto';
import { MensalistasService } from '../cadastro-mensalista/cadastro-mensalista.service';
import { EstacionamentoService } from '../estacionamento-cadastro/cadastro-estacionamento.service';

@Injectable()
export class VeiculossService extends BaseService<Veiculos> {
  constructor(
    @InjectRepository(Veiculos)
    private readonly veiculosRepository: Repository<Veiculos>,
    private readonly mensalistaService: MensalistasService,
    private readonly estacionamentoService: EstacionamentoService,
  ) {
    super(veiculosRepository);
  }

  async cadastrarVeiculo(
    cadastrarVeiculos: CadastrarVeiculosDto,
  ): Promise<CadastrarVeiculosDto> {
    const existeEstacionamento = await this.estacionamentoService._getByParams({
      id: cadastrarVeiculos.estacionamentoId,
    });
    if (!existeEstacionamento)
      throw new BadRequestException('Estacionamento não encontrado!');

    if (cadastrarVeiculos.cpfMensalista) {
      const existeMensalista = await this.mensalistaService._getByParams({
        cpf: cadastrarVeiculos.cpfMensalista,
      });
      if (!existeMensalista)
        throw new BadRequestException('Mensalista não encontrado!');
    }

    const veiculo = await this.veiculosRepository.save(cadastrarVeiculos);

    return veiculo;
  }

  async atualizarVeiculo(
    veiculoId: number,
    atualizarVeiculo: AtualizarVeiculosDto,
  ) {
    const existeVeiculo = await this._getByParams({
      id: veiculoId,
    });
    if (!existeVeiculo)
      throw new BadRequestException('veículo não encontrado!');

    const veiculoParaAtualizar = {
      ...existeVeiculo,
      ...atualizarVeiculo,
      updatedAt: new Date(),
    };

    const veiculo = await this.veiculosRepository.update(
      veiculoId,
      veiculoParaAtualizar,
    );

    return veiculo;
  }

  async deletarVeiculo(veiculoId: number) {
    const existeVeiculo = await this._getByParams({ id: veiculoId });
    if (!existeVeiculo) {
      throw new BadRequestException('veículo não encontrado!');
    }

    return this.veiculosRepository.delete(veiculoId);
  }

  async findAll(estacionamentoId: number): Promise<Veiculos[]> {
    return this.veiculosRepository.find({
      where: { estacionamentoId },
    });
  }
}
