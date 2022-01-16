import { Injectable } from '@nestjs/common';

import { BaseAdminEntity } from '../baseGeneric/baseAdmin.entity';
import { BaseAdminRepositoryInterface } from '../baseGeneric/baseAdmin.repository.interface';
import { User } from './user.interface';

export abstract class UsersRepositoryInterface extends BaseAdminRepositoryInterface<UserEntity> {}

export class UserEntity extends BaseAdminEntity<User> implements User {
  readonly UserIdentity: string;

  constructor(user: User, UserIdentity: string) {
    super(user);
    this.UserIdentity = UserIdentity;
  }
}

export abstract class UserIdentitiesProvider {
  abstract getIdentities(): Promise<string[]>;
}

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepositoryInterface, private identitiesProvider: UserIdentitiesProvider) {}
  async get(currentRecordId?: number | string): Promise<User[]> {
    const allUsers = await this.repository.getAll();
    return allUsers.filter((entity: UserEntity) => entity.IsDeleted === false || entity.Id == currentRecordId);
  }
  async add(entry: User) {
    return await this.repository.create(new UserEntity(entry, entry.UserIdentity));
  }
  async update(id: number, entry: User) {
    entry.Id = id;
    await this.repository.update(new UserEntity(entry, entry.UserIdentity));
  }
  async remove(id: number) {
    const user = await this.repository.getOne(id);
    if (!user) {
      throw Error('Not found');
    }
    user.IsDeleted = true;
    await this.repository.update(user);
  }

  async getOne(id: number) {
    return await this.repository.getOne(id);
  }

  async getIdentities() {
    return this.identitiesProvider.getIdentities();
  }
}
