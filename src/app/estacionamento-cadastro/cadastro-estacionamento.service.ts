import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Estacionamento } from './entities/cadastro-estacionamento.entity';
import { Repository } from 'typeorm';
import { CadastrarEstacionamentoDto } from './dto/cadastrar-estacionamento.dto';
import { AtualizarCadastroEstacionamento } from './dto/atualizar-estacionamento.dto';
import { UsuariosService } from '../users/usuarios.service';
import { UsuarioTipoEnum } from '../users/enum/usuario-tipo.enum';

@Injectable()
export class EstacionamentoService extends BaseService<Estacionamento> {
  constructor(
    @InjectRepository(Estacionamento)
    private readonly estacionamentoRepository: Repository<Estacionamento>,
    private readonly usuariosService: UsuariosService,
  ) {
    super(estacionamentoRepository);
  }

  async cadastrarEstacionamento(
    cadastrarEstacionamento: CadastrarEstacionamentoDto,
  ): Promise<Estacionamento> {
    const existeUsuario = await this.usuariosService._getByParams({
      id: cadastrarEstacionamento.usuarioId,
    });
    if (!existeUsuario || existeUsuario.tipo !== UsuarioTipoEnum.PROPRIETARIO)
      throw new BadRequestException('Proprietário não encontrado!');

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

    if (atualizarEstacionamento.usuarioId) {
      const existeUsuario = await this.usuariosService._getByParams({
        id: atualizarEstacionamento.usuarioId,
      });
      if (!existeUsuario || existeUsuario.tipo !== UsuarioTipoEnum.PROPRIETARIO)
        throw new BadRequestException('Proprietário não encontrado.!');
    }

    const estacionamentoParaAtualizar = {
      ...existeEstacionamento,
      ...atualizarEstacionamento,
      updatedAt: new Date(),
    };

    await this.estacionamentoRepository.update(id, estacionamentoParaAtualizar);

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
