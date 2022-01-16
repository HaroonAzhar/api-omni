import { Injectable } from '@nestjs/common';

import {
  Contact,
  CreateContact,
  ContactEntity,
  CreateContactEntity,
  UpdateContactEntity,
  UpdateContact,
} from './contact.interface';

export abstract class ContactsRepositoryInterface {
  abstract create(entity: CreateContactEntity): Promise<number>;

  abstract getAll(): Promise<ContactEntity[]>;

  abstract find(query: string): Promise<ContactEntity[]>;

  abstract getOne(id: number): Promise<ContactEntity>;

  abstract update(id: number, entity: UpdateContactEntity): Promise<void>;
}

@Injectable()
export class ContactsService {
  constructor(private repository: ContactsRepositoryInterface) {}

  async get(currentRecordId?: number | string): Promise<Contact[]> {
    const allContacts = await this.repository.getAll();
    const validContacts = allContacts.filter(
      (entity: ContactEntity) => entity.IsDeleted !== true || entity.Id == currentRecordId
    );
    return validContacts;
  }

  async find(query: string): Promise<Contact[]> {
    const allContacts = await this.repository.find(query);
    const validContacts = allContacts.filter((entity: ContactEntity) => entity.IsDeleted !== true);
    return validContacts;
  }

  async add(entry: CreateContact): Promise<number> {
    const id = await this.repository.create(entry);
    return id;
  }

  async update(id: number, entry: UpdateContact): Promise<void> {
    await this.repository.update(id, entry);
  }

  async remove(id: number): Promise<void> {
    const contact = await this.repository.getOne(id);
    if (!contact) {
      throw Error('Not found');
    }
    await this.repository.update(id, { IsDeleted: true });
  }

  async getOne(id: number): Promise<Contact | undefined> {
    const contact = await this.repository.getOne(id);
    if (!contact) {
      return undefined;
    }
    return contact;
  }

  async saveProofOfId(id: number, ProofOfId: string, ProofOfIdExpiryDate: string): Promise<void> {
    await this.repository.update(id, { ProofOfId, ProofOfIdExpiryDate });
  }
}
