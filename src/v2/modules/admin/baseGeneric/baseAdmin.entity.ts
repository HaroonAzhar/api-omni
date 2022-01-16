import { BaseAdminInterface } from './baseAdmin.interface';

export class BaseAdminEntity<BaseInterface extends BaseAdminInterface> {
  constructor(base: BaseInterface) {
    this.Name = base.Name;
    this.Id = base.Id;
  }
  IsDeleted = false;
  Name: string;
  Id: number;
}
