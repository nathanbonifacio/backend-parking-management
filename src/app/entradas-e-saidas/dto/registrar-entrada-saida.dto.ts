import { ApiProperty } from '@nestjs/swagger';
import { FormaPagamentoEnum } from '../enum/forma-pagamento.enum';
import { TipoClienteEnum } from '../enum/tipo-cliente.enum';

export class RegistrarEntradasESaidasDto {
  @ApiProperty({
    required: false,
    description: 'Campo contendo o horário de entrada do veículo',
  })
  horarioEntrada: Date;

  @ApiProperty({
    required: false,
    description: 'Campo contendo o horário de saída do veículo',
  })
  horario_saida: Date;

  @ApiProperty({
    required: false,
    description: 'Campo contendo o valor pago pelo veículo',
  })
  valorPago: number;

  @ApiProperty({
    required: false,
    description: 'Campo contendo a placa do veículo',
  })
  veiculoPlaca: string;

  @ApiProperty({
    required: false,
    description: 'Campo contendo a forma de pagamento do cliente',
  })
  formaPagamento: FormaPagamentoEnum;

  @ApiProperty({
    required: false,
    description: 'Campo contendo o número da vaga do veículo',
  })
  vaga: string;

  @ApiProperty({
    required: false,
    description: 'Campo contendo o horário da data de pagamento do veículo',
  })
  dataPagamento: Date;

  @ApiProperty({
    required: false,
    description: 'Campo contendo o horário de entrada do veículo',
  })
  tipoCliente: TipoClienteEnum;

  @ApiProperty({
    required: false,
    description: 'Campo contendo o cpf do mensalista',
  })
  cpfMensalista: string;
}
