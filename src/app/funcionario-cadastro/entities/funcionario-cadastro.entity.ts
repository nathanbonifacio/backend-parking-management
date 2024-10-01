import { ApiProperty } from '@nestjs/swagger';
import { Proprietario } from 'src/app/proprietario-cadastro/entities/proprietario-cadastro.entity';
import { BaseEntity } from 'src/base/base.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity('funcionario')
export class Funcionario extends BaseEntity {
  @ApiProperty({
    nullable: false,
    description: 'Campo contendo o nome do funcionário.',
  })
  @Column({ name: 'nome', type: 'varchar', length: 45, nullable: false })
  nome: string;

  @ApiProperty({
    required: true,
    description: 'Campo contendo o cpf do funcionario.',
  })
  @Column({
    name: 'cpf_funcionario',
    type: 'varchar',
    length: 11,
    nullable: false,
  })
  cpfFuncionario: string;

  @ApiProperty({
    required: true,
    description: 'Campo contendo o cpf do proprietario.',
  })
  @Column({
    name: 'cpf_proprietario',
    type: 'varchar',
    length: 11,
    nullable: false,
  })
  cpfProprietario: string;

  @ApiProperty({
    required: true,
    description: 'Campo contendo o whatsapp de um funcionário.',
  })
  @Column({ name: 'whatsapp', type: 'varchar', length: 11, nullable: false })
  whatsapp: string;

  @ApiProperty({
    nullable: false,
    description: 'Campo contendo a senho do funcionário.',
  })
  @Column({ name: 'senha', type: 'text', nullable: false })
  senha: string;

  @ManyToOne(() => Proprietario, (proprietario) => proprietario.funcionario)
  proprietario: Proprietario;
}
