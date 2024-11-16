import { ApiProperty } from '@nestjs/swagger';
import { TipoVeiculoEnum } from '../enum/tipo.enum';

export class CriarCadastroMensalistaDto {
  @ApiProperty({
    required: false,
    description: 'Campo contendo o nome do mensalista.',
  })
  nome: string;

  @ApiProperty({
    required: false,
    example: 'teste@teste.com',
    description: 'Campo contendo o email do mensalista.',
  })
  email: string;

  @ApiProperty({
    required: false,
    description: 'Campo contendo o whatsapp do mensalista.',
  })
  whatsapp: string;

  @ApiProperty({
    required: false,
    description: 'Campo contendo o CPF do mensalista.',
  })
  cpf: string;

  @ApiProperty({
    required: false,
    description: 'Campo contendo o ID de um estacionamento.',
  })
  estacionamentoId: number;

  @ApiProperty({
    required: false,
    description: 'Campo contendo o tipo de veiculo do mensalista.',
  })
  tipo: TipoVeiculoEnum;

  @ApiProperty({
    required: false,
    description: 'Campo contendo a descrição de veiculo do mensalista.',
  })
  descricao: string;

  @ApiProperty({
    required: false,
    description: 'Campo contendo a placa do veiculo do mensalista.',
  })
  placa: string;

  @ApiProperty({
    required: false,
    description: 'Campo contendo a vaga do veiculo do mensalista.',
  })
  vagas: string;
}
