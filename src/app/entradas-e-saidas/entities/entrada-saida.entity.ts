import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';
import { FormaPagamentoEnum } from '../enum/forma-pagamento.enum';
import { TipoClienteEnum } from '../enum/tipo-cliente.enum';

@Entity('entrada_saida')
export class EntradaSaida extends BaseEntity {
  @ApiProperty({
    nullable: true,
    description: 'Campo contendo o horário de entrada do veículo',
  })
  @Column({ name: 'horario_entrada', type: 'datetime', nullable: true })
  horarioEntrada: Date;

  @ApiProperty({
    nullable: true,
    description: 'Campo contendo o horário de saída do veículo',
  })
  @Column({ name: 'horario_saida', type: 'datetime', nullable: true })
  horario_saida: Date;

  @ApiProperty({
    nullable: true,
    description: 'Campo contendo o valor pago pelo veículo',
  })
  @Column({ name: 'valor_pago', type: 'double', nullable: true })
  valorPago: number;

  @ApiProperty({
    nullable: true,
    description: 'Campo contendo a placa do veículo',
  })
  @Column({ name: 'veiculo_placa', type: 'varchar', nullable: true })
  veiculoPlaca: string;

  @ApiProperty({
    nullable: true,
    description: 'Campo contendo a forma de pagamento do cliente',
  })
  @Column({
    name: 'forma_pagamento',
    type: 'enum',
    enum: FormaPagamentoEnum,
    nullable: true,
  })
  formaPagamento: FormaPagamentoEnum;

  @ApiProperty({
    nullable: true,
    description: 'Campo contendo o horário de entrada do veículo',
  })
  @Column({ name: 'data_pagamento', type: 'datetime', nullable: true })
  dataPagamento: Date;

  @ApiProperty({
    nullable: true,
    description: 'Campo contendo o horário de entrada do veículo',
  })
  @Column({
    name: 'tipo_cliente',
    type: 'enum',
    enum: TipoClienteEnum,
    nullable: true,
  })
  tipoCliente: TipoClienteEnum;

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
}
