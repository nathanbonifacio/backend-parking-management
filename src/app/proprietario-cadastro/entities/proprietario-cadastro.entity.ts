import { ApiProperty } from '@nestjs/swagger';
import { Funcionario } from 'src/app/funcionario-cadastro/entities/funcionario-cadastro.entity';
import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('proprietario')
export class Proprietario extends BaseEntity {
  @ApiProperty({
    nullable: false,
    description: 'Campo contendo o nome de um proprietario.',
  })
  @Column({ name: 'nome', type: 'varchar', nullable: false })
  nome: string;

  @ApiProperty({
    required: true,
    description: 'Campo contendo o cpf do proprietario.',
  })
  @Column({
    name: 'cpf',
    type: 'varchar',
    length: 11,
    nullable: false,
  })
  cpf: string;

  @ApiProperty({
    nullable: false,
    description: 'Campo contendo o email do proprietario.',
  })
  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
    unique: true,
    nullable: false,
  })
  email: string;

  @ApiProperty({
    nullable: false,
    description: 'Campo contendo a senha do proprietario.',
  })
  @Column({ name: 'senha', type: 'text', nullable: false })
  senha: string;

  @OneToMany(() => Funcionario, (funcionario) => funcionario.proprietario)
  funcionario: Funcionario;
}
