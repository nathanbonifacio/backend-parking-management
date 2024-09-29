import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Estacionamento extends BaseEntity {
  @ApiProperty({
    description: 'Campo contendo o nome do estacionamento.',
  })
  @Column({
    name: 'estacionamento_nome',
    type: 'varchar',
    length: 45,
    nullable: false,
  })
  estacionamentoNome: string;

  @ApiProperty({
    description: 'Campo contendo o endereço do estacionamento.',
  })
  @Column({
    name: 'endereco',
    type: 'varchar',
    length: 45,
    nullable: false,
  })
  endereco: string;

  @ApiProperty({
    description: 'Campo contendo o número de vagas total do estacionamento.',
  })
  @Column({ name: 'total_vagas', type: 'int', nullable: false })
  totalvagas: number;

  @ApiProperty({
    description: 'Campo contendo o cpf do proprietario.',
  })
  @Column({ name: 'cpf_proprietario', type: 'int', nullable: false })
  cpfProprietario: number;

  @ApiProperty({
    description: 'Campo contendo o cpf do funcionario.',
  })
  @Column({ name: 'cpf_funcionario', type: 'int', nullable: false })
  cpfFuncionario: number;
}
