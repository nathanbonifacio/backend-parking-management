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
  @Column({ name: 'name', type: 'varchar', length: 45, nullable: false })
  name: string;

  @ApiProperty({
    required: true,
    description: 'Campo contendo o cpf do funcionario.',
  })
  @Column({ name: 'cpf', type: 'varchar', length: 11, nullable: false })
  cpfFuncionario: string;

  @ApiProperty({
    required: true,
    description: 'Campo contendo o cpf do proprietario.',
  })
  @Column({ name: 'cpf', type: 'varchar', length: 11, nullable: false })
  cpfProprietario: string;

  @ApiProperty({
    nullable: false,
    description: 'Campo contendo a senho do funcionário.',
  })
  @Column({ name: 'password', type: 'text', nullable: false })
  password: string;

  @ManyToOne(() => Proprietario, (proprietario) => proprietario.funcionario)
  proprietario: Proprietario;
}
