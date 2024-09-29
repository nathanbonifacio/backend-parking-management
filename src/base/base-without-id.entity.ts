import { ApiProperty } from '@nestjs/swagger';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseWithoutIdEntity {
  @ApiProperty({
    required: false,
    readOnly: true,
    description: 'Created row date',
  })
  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: 'now()',
  })
  createdAt?: Date;

  @ApiProperty({
    required: false,
    readOnly: true,
    description: 'Updated row date',
  })
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    onUpdate: 'now()',
  })
  updatedAt?: Date;
}
