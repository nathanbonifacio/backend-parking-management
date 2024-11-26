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
    const entradaSaida = await this.entradaSaidaRepository.save(registrar);

    return entradaSaida;
  }

  async atualizarEntradaSaida(
    id: number,
    atualizar: AtualizarEntradasESaidasDto,
  ) {
    const existe = await this._getByParams({
      id: id,
    });
    if (!existe) throw new BadRequestException('Registro não encontrado!');

    const entradaESaidaParaAtualizar = {
      ...existe,
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
