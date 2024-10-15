import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class RedefinirDto {
  @ApiProperty({
    required: true,
    description: 'Campo contendo a senha do usuário.',
  })
  password: string;

  @IsJWT()
  token: string;
}
