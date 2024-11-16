import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';
import { TipoVeiculoEnum } from '../enum/tipo.enum';

@Entity('mensalistas')
export class Mensalistas extends BaseEntity {
  @ApiProperty({
    nullable: true,
    description: 'Campo contendo o nome do mensalista.',
  })
  @Column({ name: 'nome', type: 'varchar', nullable: true })
  nome: string;

  @ApiProperty({
    nullable: true,
    example: 'teste@teste.com',
    description: 'Campo contendo o email do mensalista.',
  })
  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: true,
  })
  email: string;

  @ApiProperty({
    nullable: true,
    description: 'Campo contendo o whatsapp do mensalista.',
  })
  @Column({ name: 'whatsapp', type: 'varchar', length: 11, nullable: true })
  whatsapp: string;

  @ApiProperty({
    nullable: true,
    description: 'Campo contendo o CPF do mensalista.',
  })
  @Column({
    name: 'cpf',
    type: 'varchar',
    length: 11,
    nullable: true,
  })
  cpf: string;

  @ApiProperty({
    nullable: true,
    description: 'Campo contendo o ID de um estacionamento.',
  })
  @Column({ name: 'estacionamento_id', type: 'int', nullable: true })
  estacionamentoId: number;

  @ApiProperty({
    nullable: true,
    description: 'Campo contendo o tipo de veiculo do mensalista.',
  })
  @Column({ name: 'tipo', type: 'enum', enum: TipoVeiculoEnum, nullable: true })
  tipo: TipoVeiculoEnum;

  @ApiProperty({
    nullable: true,
    description: 'Campo contendo a descrição de veiculo do mensalista.',
  })
  @Column({ name: 'descricao', type: 'varchar', nullable: true })
  descricao: string;

  @ApiProperty({
    nullable: true,
    description: 'Campo contendo a placa do veiculo do mensalista.',
  })
  @Column({ name: 'placa', type: 'varchar', nullable: true })
  placa: string;

  @ApiProperty({
    nullable: true,
    description: 'Campo contendo a vaga do veiculo do mensalista.',
  })
  @Column({ name: 'vagas', type: 'varchar', nullable: true })
  vagas: string;
}
