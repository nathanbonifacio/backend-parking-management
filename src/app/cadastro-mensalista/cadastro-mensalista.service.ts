import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Mensalistas } from './entities/cadastro-mensalista.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CriarCadastroMensalistaDto } from './dto/criar-cadastro-mensalista.dto';
import { AtualizarCadastroMensalistaDto } from './dto/atualizar-cadastro-mensalista.dto';

@Injectable()
export class MensalistasService extends BaseService<Mensalistas> {
  constructor(
    @InjectRepository(Mensalistas)
    private readonly mensalistasRepository: Repository<Mensalistas>,
  ) {
    super(mensalistasRepository);
  }

  async cadastrarMensalistas(
    cadastrarMensalistas: CriarCadastroMensalistaDto,
  ): Promise<CriarCadastroMensalistaDto> {
    const existeMensalista = await this._getByParams({
      email: cadastrarMensalistas.email,
    });
    if (existeMensalista) {
      throw new BadRequestException('Email e/ou CPF já cadastrado(s).');
    }

    const existeCPF = await this._getByParams({
      cpf: cadastrarMensalistas.cpf,
    });
    if (existeCPF) {
      throw new BadRequestException('Email e/ou CPF já cadastrado(s).');
    }

    const mensalista =
      await this.mensalistasRepository.save(cadastrarMensalistas);

    return mensalista;
  }

  async atualizarMensalista(
    mensalistaId: number,
    atualizarMensalista: AtualizarCadastroMensalistaDto,
  ) {
    const existeMensalista = await this._getByParams({ id: mensalistaId });
    if (!existeMensalista) {
      throw new BadRequestException('Mensalista não identificado!');
    }

    const mensalistaParaAtualizar = {
      ...existeMensalista,
      ...atualizarMensalista,
      updatedAt: new Date(),
    };

    const mensalistaAtualizado = await this.mensalistasRepository.update(
      mensalistaId,
      mensalistaParaAtualizar,
    );

    return mensalistaAtualizado;
  }

  async deletarMensalista(mensalistaId: number) {
    const existeMensalista = await this._getByParams({ id: mensalistaId });
    if (!existeMensalista) {
      throw new BadRequestException('Mensalista não identificado!');
    }

    return this.mensalistasRepository.delete(mensalistaId);
  }

  async findAll(estacionamentoId: number): Promise<Mensalistas[]> {
    return this.mensalistasRepository.find({
      where: { estacionamentoId },
    });
  }
}
