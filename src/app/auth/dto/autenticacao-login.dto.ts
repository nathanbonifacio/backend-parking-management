import { ApiProperty } from '@nestjs/swagger';

export class AutenticacaoLoginDto {
  @ApiProperty({
    required: true,
    description: 'Campo contendo o email do usuário.',
  })
  email?: string;

  @ApiProperty({
    required: true,
    description: 'Campo contendo o cpf de um funcionário.',
  })
  cpfFuncionario?: string;

  @ApiProperty({
    required: true,
    description: 'Campo contendo a senha do usuário.',
  })
  senha: string;
}
