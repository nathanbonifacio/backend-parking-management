/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MensalistasService } from '../cadastro-mensalista/cadastro-mensalista.service';
import { EstacionamentoService } from '../estacionamento-cadastro/cadastro-estacionamento.service';
import { RegistrarEntradasESaidasDto } from './dto/registrar-entrada-saida.dto';
import { EntradaSaida } from './entities/entrada-saida.entity';
import { AtualizarEntradasESaidasDto } from './dto/atualizar-entrada-saida.dto';

@Injectable()
export class EntradaSaidaService extends BaseService<EntradaSaida> {
  constructor(
    @InjectRepository(EntradaSaida)
    private readonly entradaSaidaRepository: Repository<EntradaSaida>,
    private readonly mensalistaService: MensalistasService,
    private readonly estacionamentoService: EstacionamentoService,
  ) {
    super(entradaSaidaRepository);
  }

  async cadastrarEntradaSaida(
    registrar: RegistrarEntradasESaidasDto,
  ): Promise<RegistrarEntradasESaidasDto> {
    // const existeMensalista = await this.mensalistaService._getByParams({
    //   cpf: cadastrarVeiculos.cpfMensalista,
    // });
    // if (!existeMensalista)
    //   throw new BadRequestException('Mensalista não encontrado!');

    // if (cadastrarVeiculos.cpfMensalista) {
    //   const existeEstacionamento =
    //     await this.estacionamentoService._getByParams({
    //       id: cadastrarVeiculos.estacionamentoId,
    //     });
    //   if (!existeEstacionamento)
    //     throw new BadRequestException('Estacionamento não encontrado!');
    // }

    // const veiculo = await this.veiculosRepository.save(cadastrarVeiculos);

    // return veiculo;
    return null;
  }

  async atualizarEntradaSaida(
    id: number,
    atualizar: AtualizarEntradasESaidasDto,
  ) {
    // const existeVeiculo = await this._getByParams({
    //   id: veiculoId,
    // });
    // if (!existeVeiculo)
    //   throw new BadRequestException('veículo não encontrado!');

    // const veiculoParaAtualizar = {
    //   ...existeVeiculo,
    //   ...atualizarVeiculo,
    //   updatedAt: new Date(),
    // };

    // const veiculo = await this.veiculosRepository.update(
    //   veiculoId,
    //   veiculoParaAtualizar,
    // );

    // return veiculo;
  }

  async deletarRegistro(id: number) {
    const existeRegistro = await this._getByParams({ id: id });
    if (!existeRegistro) {
      throw new BadRequestException('Registro não encontrado!');
    }

    return this.entradaSaidaRepository.delete(id);
  }
}
