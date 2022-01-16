interface BaseAdminServiceInterface<T> {
  get(currentRecordId: number): Promise<T[]>;
  getOne(currentRecordId: number): Promise<T>;
  update(id: number, entity: T): Promise<void>;
  add(entity: T): Promise<number>;
  remove(id: number): Promise<void>;
}
