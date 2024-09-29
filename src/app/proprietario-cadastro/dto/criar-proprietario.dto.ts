import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';

export class CriarProprietarioDto {
  @ApiProperty({
    required: true,
    description: 'Field containing the first name of the owner.',
  })
  nome: string;

  @ApiProperty({
    required: true,
    example: 'teste@teste.com',
    description: 'Field containing the email of the owner.',
  })
  email: string;

  @ApiProperty({
    required: true,
    description: 'Field containing the cpf of the owner.',
  })
  cpf: string;

  @ApiProperty({
    required: true,
    description: 'Field containing the password of the owner.',
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
    description: 'Field containing the password confirmation of the owner.',
  })
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  confirmaSenha: string;
}
