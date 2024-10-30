import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('mensalistas')
export class Mensalistas extends BaseEntity {
  @ApiProperty({
    nullable: false,
    description: 'Campo contendo o nome do mensalista.',
  })
  @Column({ name: 'nome', type: 'varchar', nullable: false })
  nome: string;

  @ApiProperty({
    nullable: false,
    example: 'teste@teste.com',
    description: 'Campo contendo o email do mensalista.',
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
    description: 'Campo contendo o whatsapp do mensalista.',
  })
  @Column({ name: 'whatsapp', type: 'varchar', length: 11, nullable: false })
  whatsapp: string;

  @ApiProperty({
    nullable: false,
    description: 'Campo contendo o CPF do mensalista.',
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
    description: 'Campo contendo o ID de um estacionamento.',
  })
  @Column({ name: 'estacionamento_id', type: 'int', nullable: false })
  estacionamentoId: number;
}
