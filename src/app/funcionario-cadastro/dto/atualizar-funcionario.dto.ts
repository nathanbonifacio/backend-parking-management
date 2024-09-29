import { PartialType } from '@nestjs/swagger';
import { CriarFuncionarioDto } from './criar-funcionaro.dto';

export class AtualizarFuncionarioDto extends PartialType(CriarFuncionarioDto) {}
