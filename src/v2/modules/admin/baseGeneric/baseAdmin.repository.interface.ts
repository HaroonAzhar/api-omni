export abstract class BaseAdminRepositoryInterface<Entity> {
  abstract create(solicitor: Entity): Promise<number>;

  abstract getAll(): Promise<Entity[]>;

  abstract getOne(id: number): Promise<Entity>;

  abstract update(solicitor: Entity): Promise<void>;
}
