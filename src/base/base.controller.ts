import { HttpException, HttpStatus } from '@nestjs/common';
import { BaseEntity } from 'typeorm';
import { BaseService } from './base.service';

export class BaseController<EntityType extends BaseEntity> {
  constructor(protected readonly service: BaseService<EntityType>) {}

  protected async _checkExists(_id: number): Promise<any> {
    const data = await this.service._checkExists(_id);

    if (!data) {
      throw new HttpException(
        this.makeReturn(false, null, `ID not found (${this.constructor.name})`),
        HttpStatus.NOT_FOUND,
      );
    } else {
      return true;
    }
  }

  makeReturn(success = false, data: any = null, message: string = null) {
    return { success, data, message };
  }
}
