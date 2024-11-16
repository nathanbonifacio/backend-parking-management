import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';
import { UsuarioTipoEnum } from '../enum/usuario-tipo.enum';

@Entity('usuarios')
export class Usuario extends BaseEntity {
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
    nullable: true,
    description: 'Campo contendo o tipo do usuário.',
  })
  @Column({
    name: 'tipo',
    type: 'enum',
    enum: UsuarioTipoEnum,
    nullable: true,
  })
  tipo: UsuarioTipoEnum;

  @ApiProperty({
    nullable: false,
    description: 'Campo contendo a senha do proprietario.',
  })
  @Column({ name: 'senha', type: 'text', nullable: false })
  senha: string;

  @ApiProperty({
    nullable: true,
    description: 'Campo contendo o estacionamento do funcionário.'
  })
  @Column({ name: 'estacionamento', type: 'text', nullable: true })
  estacionamento?: string;
}
