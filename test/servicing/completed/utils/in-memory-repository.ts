type CompletedEntity = {
  FkCompletedId?: number;
};

export class InMemoryRepository<T extends CompletedEntity> {
  entities: T[] = [];
  create(entity: T): Promise<number> {
    this.entities.push(entity);
    return new Promise((resolve) => resolve(this.entities.length - 1));
  }
  findAll(completedId: number): Promise<T[]> {
    return new Promise((resolve) =>
      resolve(
        this.entities.filter((entity) => entity.FkCompletedId === completedId)
      )
    );
  }
  delete(completedId: number, entityId: number): Promise<number> {
    this.entities.splice(entityId, 1);
    return Promise.resolve(entityId);
  }
  get(completedId: number, entityId: number): Promise<T> {
    return Promise.resolve(this.entities[entityId]);
  }
  update(completedId: number, entityId: number, entity: T): Promise<number> {
    this.entities[entityId] = entity;
    return Promise.resolve(entityId);
  }
}
