import { Injectable, NotFoundException } from '@nestjs/common';
import { CasesService } from '@v2/modules/cases/cases.service';

import { Case } from './../../cases/case.interface';
import {
  Broker,
  CreateBroker,
  BrokerIndividualEntity,
  CreateBrokerIndividualEntity,
  UpdateBrokerIndividualEntity,
  BrokerEntity,
  CreateBrokerEntity,
  UpdateBrokerEntity,
  BrokerIndividual,
  UpdateBroker,
} from './broker.interface';

export abstract class BrokerIndividualsRepositoryInterface {
  abstract create(entity: CreateBrokerIndividualEntity): Promise<number>;

  abstract getAll(FkBrokerId: number): Promise<BrokerIndividualEntity[]>;

  abstract getOne(id: number): Promise<BrokerIndividualEntity>;

  abstract update(id: number, entity: UpdateBrokerIndividualEntity): Promise<void>;
}

export abstract class BrokersRepositoryInterface {
  abstract create(entity: CreateBrokerEntity): Promise<number>;

  abstract getAll(): Promise<BrokerEntity[]>;

  abstract getOne(id: number): Promise<BrokerEntity>;

  abstract update(id: number, entity: UpdateBrokerEntity): Promise<void>;
}

const fillBroker = (entity: BrokerEntity, individualBrokers: BrokerIndividual[], associatedCases: Case[]): Broker => {
  return {
    CompanyName: entity.CompanyName,
    isApproved: entity.DateApproved !== null,
    individualBrokers,
    associatedCases,
    Id: entity.Id,
  };
};

@Injectable()
export class BrokersService {
  constructor(
    private repository: BrokersRepositoryInterface,
    private brokerIndividualRepository: BrokerIndividualsRepositoryInterface,
    private readonly casesService: CasesService
  ) {}

  private async fillBroker(entity: BrokerEntity): Promise<Broker> {
    const individualBrokers = await this.brokerIndividualRepository.getAll(entity.Id);

    const validIndividuals = individualBrokers.filter((individualBroker) => individualBroker.IsDeleted !== true);
    const associatedCases = await this.casesService.getCasesByBrokerId(entity.Id);
    return fillBroker(entity, validIndividuals, associatedCases);
  }
  async get(currentRecordId?: number | string): Promise<Broker[]> {
    const allBrokers = await this.repository.getAll();
    const validBrokers = allBrokers.filter(
      (entity: BrokerEntity) => entity.IsDeleted !== true || entity.Id == currentRecordId
    );
    const brokers: Broker[] = await Promise.all(
      validBrokers.map(async (entity: BrokerEntity) => this.fillBroker(entity))
    );
    return brokers;
  }

  async add(entry: CreateBroker): Promise<number> {
    const creatEntity: CreateBrokerEntity = entry.isApproved
      ? { CompanyName: entry.CompanyName, DateApproved: new Date() }
      : { CompanyName: entry.CompanyName };
    const id = await this.repository.create(creatEntity);
    if (entry.individualBrokers === undefined) {
      return id;
    }
    for (const entryIndividual of entry.individualBrokers) {
      await this.addIndividual(entryIndividual as BrokerIndividual, id);
    }
    return id;
  }

  private async addIndividual(entry: BrokerIndividual, FkBrokerId: number): Promise<number> {
    if (entry.ContactEmail === undefined || entry.ContactName === undefined) {
      return -1;
    }
    return this.brokerIndividualRepository.create({ FkBrokerId, ...entry });
  }

  private async removeIndividual(entry: BrokerIndividual): Promise<void> {
    return this.brokerIndividualRepository.update(entry.Id, { IsDeleted: true });
  }

  async update(id: number, entry: UpdateBroker): Promise<void> {
    const existingBroker = await this.getOne(id);

    if (entry.isApproved === true && existingBroker.isApproved === false) {
      await this.repository.update(id, {
        DateApproved: new Date(),
      });
    } else if (entry.isApproved === false) {
      await this.repository.update(id, { DateApproved: null });
    }
    await this.repository.update(id, { CompanyName: entry.CompanyName ?? existingBroker.CompanyName });

    if (entry.individualBrokers === undefined) {
      return;
    }
    await this.updateIndividuals(id, entry, existingBroker);
  }

  private async updateIndividuals(id: number, entry: UpdateBroker, existingBroker: Broker): Promise<void> {
    const updatedIndividuals = [];
    for (const individualBrokerUpdate of entry.individualBrokers) {
      const existingIndividual = existingBroker.individualBrokers.find(
        (existing) => existing.Id === individualBrokerUpdate.Id
      );
      if (existingIndividual) {
        updatedIndividuals.push(individualBrokerUpdate.Id);
        await this.brokerIndividualRepository.update(individualBrokerUpdate.Id, {
          ContactEmail: individualBrokerUpdate.ContactEmail,
        });
      } else {
        await this.addIndividual(individualBrokerUpdate as BrokerIndividual, id);
      }
    }

    for (const existingIndividual of existingBroker.individualBrokers) {
      if (updatedIndividuals.includes(existingIndividual.Id)) {
        continue;
      }
      await this.removeIndividual(existingIndividual);
    }
  }

  async remove(id: number): Promise<void> {
    const broker = await this.repository.getOne(id);
    if (!broker) {
      throw Error('Not found');
    }
    await this.repository.update(id, { IsDeleted: true });
  }

  async getOne(id: number): Promise<Broker> {
    const broker = await this.repository.getOne(id);
    if (!broker) {
      throw new NotFoundException();
    }
    return this.fillBroker(broker);
  }
}
