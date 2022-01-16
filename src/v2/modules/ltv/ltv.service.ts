import { Injectable } from '@nestjs/common';

import { CreateLtvDto, HistoricalLtv, LtvRepositoryInterface } from './ltv.interface';

@Injectable()
export class LtvService {
  constructor(private repository: LtvRepositoryInterface) {}

  async create(record: CreateLtvDto) {
    return this.repository.create(record);
  }

  async getNewest() {
    return this.repository.getNewest();
  }

  async getAllHistoricalCount() {
    return this.repository.getHistoricalCount();
  }

  /**
   * This method returns historical data based on offset and limit.
   * Historical data should contain field ExpiredAt, that informs when LTV is expired.
   * To calculate this we need one row before proper set. To achieve that we decrement
   * offset and limit should be incremented by 1.
   *
   * ----|--------|--- <- we want this [offset, offset + limit]
   * so, we select
   * ---|---------|--- <- we get this [offset - 1, (offset - 1) + limit + 1]
   *
   * after that we calculate ExpiredAt and slice it.
   *
   * @param _offset
   * @param limit
   */
  async getHistorical(_offset: number, limit: number) {
    const offset = _offset - 1;

    const records = await this.repository.getHistorical(Math.max(0, offset), limit + 1);

    // find end date
    let data: HistoricalLtv[] = records.map((record, index) => {
      return {
        ...record,
        ExpiredAt: index > 0 ? records[index - 1].CreatedAt : null,
      };
    });

    if (offset >= 0) {
      data = data.slice(1);
    } else {
      data = data.slice(0, limit);
    }

    return data;
  }
}
