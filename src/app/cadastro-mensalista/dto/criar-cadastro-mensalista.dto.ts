import { ApiProperty } from "@nestjs/swagger";

export class CriarCadastroMensalistaDto {
    @ApiProperty({
        required: true,
        description: 'Campo contendo o nome do mensalista.',
      })
      nome: string;
    
      @ApiProperty({
        required: true,
        example: 'teste@teste.com',
        description: 'Campo contendo o email do mensalista.',
      })
      email: string;
      @ApiProperty({
        required: true,
        description: 'Campo contendo o whatsapp do mensalista.',
      })
      whatsapp: string;
    
      @ApiProperty({
        required: true,
        description: 'Campo contendo o CPF do mensalista.',
      })
      cpf: string;

      @ApiProperty({
        required: true,
        description: 'Campo contendo o ID de um estacionamento.',
      })
      estacionamentoId: number;
}