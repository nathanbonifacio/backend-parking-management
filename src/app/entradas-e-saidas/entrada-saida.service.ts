import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MensalistasService } from '../cadastro-mensalista/cadastro-mensalista.service';
import { EstacionamentoService } from '../estacionamento-cadastro/cadastro-estacionamento.service';
import { RegistrarEntradasESaidasDto } from './dto/registrar-entrada-saida.dto';
import { EntradaSaida } from './entities/entrada-saida.entity';
import { AtualizarEntradasESaidasDto } from './dto/atualizar-entrada-saida.dto';
import { VeiculossService } from '../cadastro-veiculos/cadastro-veiculos.service';

@Injectable()
export class EntradaSaidaService extends BaseService<EntradaSaida> {
  constructor(
    @InjectRepository(EntradaSaida)
    private readonly entradaSaidaRepository: Repository<EntradaSaida>,
    private readonly mensalistaService: MensalistasService,
    private readonly estacionamentoService: EstacionamentoService,
    private readonly veiculoService: VeiculossService,
  ) {
    super(entradaSaidaRepository);
  }

  async cadastrarEntradaSaida(
    registrar: RegistrarEntradasESaidasDto,
  ): Promise<RegistrarEntradasESaidasDto> {
    if (registrar.cpfMensalista) {
      const existeMensalista = await this.mensalistaService._getByParams({
        cpf: registrar.cpfMensalista,
      });
      if (!existeMensalista)
        throw new BadRequestException('Mensalista não encontrado!');
    }

    const existeEstacionamento = this.estacionamentoService._getByParams({
      id: registrar.estacionamentoId,
    });
    if (!existeEstacionamento)
      throw new BadRequestException('Estacionamento não encontrado!');

    const existeVeiculo = this.veiculoService._getByParams({
      id: registrar.veiculoId,
    });
    if (!existeVeiculo)
      throw new BadRequestException('veículo não encontrado!');

    const valorPrimeiraHoraEstacionamento = (await existeEstacionamento)
      .valorHora;
    const valorDemaisHorasEstacionamento = (await existeEstacionamento)
      .valorMaisHoras;

    const horarioEntrada = (await existeVeiculo).createdAt;
    const horarioSaida = new Date();

    const diffMilliseconds = horarioSaida.getTime() - horarioEntrada.getTime();
    const diffHours = Math.ceil(diffMilliseconds / (1000 * 60 * 60));

    let valorTotal: number;
    if (diffHours <= 1) {
      valorTotal = valorPrimeiraHoraEstacionamento;
    } else {
      valorTotal =
        valorPrimeiraHoraEstacionamento +
        (diffHours - 1) * valorDemaisHorasEstacionamento;
    }

    const registrarEntradaSaida = {
      ...registrar,
      horarioSaida: horarioSaida,
      valorPago: valorTotal,
      dataPagamento: new Date(),
    };

    return await this.entradaSaidaRepository.save(registrarEntradaSaida);
  }

  async atualizarEntradaSaida(
    id: number,
    atualizar: AtualizarEntradasESaidasDto,
  ) {
    const existeEntradaSaida = await this._getByParams({
      id: id,
    });
    if (!existeEntradaSaida)
      throw new BadRequestException('Registro não encontrado!');

    if (atualizar.cpfMensalista) {
      const existeMensalista = await this.mensalistaService._getByParams({
        cpf: atualizar.cpfMensalista,
      });
      if (!existeMensalista)
        throw new BadRequestException('Mensalista não encontrado!');
    }

    if (atualizar.estacionamentoId) {
      const existeEstacionamento = this.estacionamentoService._getByParams({
        id: atualizar.estacionamentoId,
      });
      if (!existeEstacionamento)
        throw new BadRequestException('Estacionamento não encontrado!');
    }

    if (atualizar.veiculoId) {
      const existeVeiculo = this.veiculoService._getByParams({
        id: atualizar.veiculoId,
      });
      if (!existeVeiculo)
        throw new BadRequestException('veículo não encontrado!');
    }

    const entradaESaidaParaAtualizar = {
      ...existeEntradaSaida,
      ...atualizar,
      updatedAt: new Date(),
    };

    const veiculo = await this.entradaSaidaRepository.update(
      id,
      entradaESaidaParaAtualizar,
    );

    return veiculo;
  }

  async deletarRegistro(id: number) {
    const existeRegistro = await this._getByParams({ id: id });
    if (!existeRegistro) {
      throw new BadRequestException('Registro não encontrado!');
    }

    return this.entradaSaidaRepository.delete(id);
  }
}
