import { ApiProperty } from '@nestjs/swagger';

export class CadastrarEstacionamentoDto {
  @ApiProperty({
    description: 'Campo contendo o nome do estacionamento.',
  })
  estacionamentoNome: string;

  @ApiProperty({
    description: 'Campo contendo o endereço do estacionamento.',
  })
  endereco: string;

  @ApiProperty({
    description: 'Campo contendo o número de vagas total do estacionamento.',
  })
  totalvagas: number;

  // @ApiProperty({
  //   description: 'Campo contendo o cpf do proprietario.',
  // })
  // proprietarioId: number;

  // @ApiProperty({
  //   description: 'Campo contendo o cpf do funcionario.',
  // })
  // funcionarioId: number;

  @ApiProperty({
    description: 'Campo contendo o ID do usuário.',
  })
  usuarioId: number;
}
