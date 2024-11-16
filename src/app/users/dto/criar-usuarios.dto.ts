import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';
import { UsuarioTipoEnum } from '../enum/usuario-tipo.enum';

export class CriarUsuariosDto {
  @ApiProperty({
    required: true,
    description: 'Campo contendo o nome do usuário.',
  })
  nome: string;

  @ApiProperty({
    required: true,
    example: 'teste@teste.com',
    description: 'Campo contendo o email do usuário.',
  })
  email: string;

  @ApiProperty({
    required: true,
    description: 'Campo contendo o CPF do usuário.',
  })
  cpf: string;

  @ApiProperty({
    required: true,
    description: 'Campo contendo o tipo do usuário.'
  })
  tipo: UsuarioTipoEnum;

  @ApiProperty({
    required: true,
    description: 'Campo contendo o estacionamento do funcionário.'
  })
  estacionamento?: string;

  @ApiProperty({
    required: true,
    description: 'Campo contendo a senha do usuário.',
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
    description: 'Campo contendo a confirmação de senha do usuário.',
  })
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  confirmaSenha?: string;
}
