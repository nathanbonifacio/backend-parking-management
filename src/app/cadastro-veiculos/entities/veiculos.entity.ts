import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('veiculos')
export class Veiculos extends BaseEntity {
  @ApiProperty({
    nullable: true,
    description: 'Campo contendo a placa do veiculo do mensalista.',
  })
  @Column({ name: 'placa', type: 'varchar', nullable: true })
  placa: string;

  @ApiProperty({
    nullable: true,
    description: 'Campo contendo a classificação do veiculo do cliente.',
  })
  @Column({ name: 'classificacao', type: 'varchar', nullable: true })
  classificacao: string;

  @ApiProperty({
    nullable: true,
    description: 'Campo contendo a descrição de veiculo do mensalista.',
  })
  @Column({ name: 'descricao', type: 'varchar', nullable: true })
  descricao: string;

  @ApiProperty({
    nullable: true,
    description: 'Campo contendo o CPF do mensalista.',
  })
  @Column({
    name: 'cpf_mensalista',
    type: 'varchar',
    length: 11,
    nullable: true,
  })
  cpfMensalista: string;

  @ApiProperty({
    nullable: true,
    description: 'Campo contendo a vaga do veiculo do mensalista.',
  })
  @Column({ name: 'vaga', type: 'varchar', nullable: true })
  vaga: string;

  @ApiProperty({
    nullable: true,
    description: 'Campo contendo o ID de um estacionamento.',
  })
  @Column({ name: 'estacionamento_id', type: 'int', nullable: true })
  estacionamentoId: number;
}
