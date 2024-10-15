import { ApiProperty } from '@nestjs/swagger';

export class EsqueciSenhaDto {
  @ApiProperty({
    required: true,
    description: 'Campo contendo o email do usuário.',
  })
  email: string;
}
