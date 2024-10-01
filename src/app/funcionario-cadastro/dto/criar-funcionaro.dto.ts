import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';

export class CriarFuncionarioDto {
  @ApiProperty({
    required: true,
    description: 'Campo contendo o cpf de um funcionário.',
  })
  cpfFuncionario: string;

  @ApiProperty({
    required: true,
    description: 'Campo contendo o nome de um funcionário.',
  })
  nome: string;

  @ApiProperty({
    required: true,
    description: 'Campo contendo o whatsapp de um funcionário.',
  })
  whatsapp: string;

  @ApiProperty({
    required: true,
    description: 'Campo contendo o cpf do proprietario.',
  })
  cpfProprietario?: string;

  @ApiProperty({
    required: true,
    description: 'Campo contendo a senha de um funcionário.',
  })
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  senha: string;

  @ApiProperty({
    required: true,
    description: 'Campo contendo a confirmação da senha de um funcionário.',
  })
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  confirmaSenha: string;
}
