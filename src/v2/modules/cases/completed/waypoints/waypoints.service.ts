import { Injectable } from '@nestjs/common';
import moment from 'moment';

import { CompletedIdentificationService } from '../completed-identification.service';
import { Waypoint, RecurringEvent, WaypointsFilterQuery } from './waypoint.interface';

export abstract class WaypointsRepositoryInterface {
  abstract create(waypoint: Waypoint): Promise<number>;
  abstract findAll(FkCompletedId: number, query?: WaypointsFilterQuery): Promise<Waypoint[]>;
  abstract delete(FkCompletedId: number, waypointId: number): Promise<number>;
  abstract get(FkCompletedId: number, waypointId: number): Promise<Waypoint>;
  abstract update(FkCompletedId: number, waypointId: number, waypoint: Waypoint): Promise<number>;
}

type ForeignIdentification = string | number;

@Injectable()
export class WaypointsService {
  constructor(
    private readonly waypointRepository: WaypointsRepositoryInterface,
    private readonly completedIdentificationService: CompletedIdentificationService
  ) {}

  private async getCompletedId(caseUuid: string): Promise<number> {
    return await this.completedIdentificationService.getIdByCaseUuid(caseUuid);
  }

  private generateRecurringWaypoints(
    waypoint: Waypoint,
    timesToRepeat: number,
    repeatingPolicy: (index: number) => [number, moment.unitOfTime.DurationConstructor]
  ) {
    return Array.from({ length: timesToRepeat }).map((_, index) => ({
      ...waypoint,
      DueDate: moment(waypoint.DueDate)
        .add(...repeatingPolicy(index))
        .format(),
    }));
  }
  private generateWeeklyWaypoints(waypoint: Waypoint, timesToRepeat: number) {
    return this.generateRecurringWaypoints(waypoint, timesToRepeat, (index: number) => [index, 'w']);
  }
  private generateFortnightlyWaypoints(waypoint: Waypoint, timesToRepeat: number) {
    return this.generateRecurringWaypoints(waypoint, timesToRepeat, (index: number) => [index * 2, 'w']);
  }
  private generate4WeeklyWaypoints(waypoint: Waypoint, timesToRepeat: number) {
    return this.generateRecurringWaypoints(waypoint, timesToRepeat, (index: number) => [index * 4, 'w']);
  }
  private generateMonthlyWaypoints(waypoint: Waypoint, timesToRepeat: number) {
    return this.generateRecurringWaypoints(waypoint, timesToRepeat, (index: number) => [index, 'M']);
  }

  private generateWaypoints(waypoint: Waypoint, repeatingEvent: RecurringEvent, numberOfTimesToRepeat?: number) {
    switch (repeatingEvent) {
      case 'not_recurring': {
        return [waypoint];
      }
      case 'weekly': {
        return this.generateWeeklyWaypoints(waypoint, numberOfTimesToRepeat);
      }
      case 'fortnightly': {
        return this.generateFortnightlyWaypoints(waypoint, numberOfTimesToRepeat);
      }
      case '4_weekly': {
        return this.generate4WeeklyWaypoints(waypoint, numberOfTimesToRepeat);
      }
      case 'monthly': {
        return this.generateMonthlyWaypoints(waypoint, numberOfTimesToRepeat);
      }
    }
  }
  async createWaypoint(
    identification: ForeignIdentification,
    waypoint: Waypoint,
    repeatingEvent: RecurringEvent,
    numberOfTimesToRepeat?: number
  ) {
    const waypoints = this.generateWaypoints(waypoint, repeatingEvent, numberOfTimesToRepeat);
    for (const newWaypoint of waypoints) {
      await this.createSingleWaypoint(identification, newWaypoint);
    }
  }

  private async createSingleWaypoint(identification: ForeignIdentification, waypoint: Waypoint) {
    let FkCompletedId;
    if (typeof identification === 'string') {
      FkCompletedId = await this.getCompletedId(identification);
    } else {
      FkCompletedId = identification;
    }

    return this.waypointRepository.create({ FkCompletedId, ...waypoint });
  }

  async getWaypoints(caseUuid: string, query?: WaypointsFilterQuery) {
    const CompletedId = await this.getCompletedId(caseUuid);

    return this.waypointRepository.findAll(CompletedId, query);
  }

  async deleteWaypoint(caseUuid: string, waypointId: number) {
    const CompletedId = await this.getCompletedId(caseUuid);
    return this.waypointRepository.delete(CompletedId, waypointId);
  }

  async updateWaypoint(caseUuid: string, waypointId: number, waypoint: Waypoint) {
    const CompletedId = await this.getCompletedId(caseUuid);
    return this.waypointRepository.update(CompletedId, waypointId, { ...waypoint });
  }
}
