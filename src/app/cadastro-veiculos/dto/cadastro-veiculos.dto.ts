import { ApiProperty } from '@nestjs/swagger';

export class CadastrarVeiculosDto {
  @ApiProperty({
    required: false,
    description: 'Campo contendo a placa do veiculo do cliente.',
  })
  placa: string;

  @ApiProperty({
    required: false,
    description: 'Campo contendo a classificação do veiculo do cliente.',
  })
  classificacao: string;

  @ApiProperty({
    required: false,
    description: 'Campo contendo a descrição de veiculo do cliente.',
  })
  descricao: string;

  @ApiProperty({
    required: false,
    description: 'Campo contendo o CPF do mensalista.',
  })
  cpfMensalista: string;

  @ApiProperty({
    required: false,
    description: 'Campo contendo a vaga do veiculo do mensalista.',
  })
  vaga: string;

  @ApiProperty({
    required: false,
    description: 'Campo contendo o ID de um estacionamento.',
  })
  estacionamentoId: number;
}
