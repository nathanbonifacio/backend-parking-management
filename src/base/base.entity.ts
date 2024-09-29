import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';
import { BaseWithoutIdEntity } from './base-without-id.entity';

export abstract class BaseEntity extends BaseWithoutIdEntity {
  @ApiProperty({
    required: false,
    readOnly: true,
    description: 'Primary key of the row',
  })
  @PrimaryGeneratedColumn('increment')
  id?: number;
}
