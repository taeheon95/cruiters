export interface Repository<T, ID> {
  findAll(searchParam: unknown): Promise<T[]>;
  findById(id: ID): Promise<T | null>;
  create(data: unknown): Promise<T>;
  update(id: ID, data: unknown): Promise<T>;
  delete(id: ID): Promise<T>;
}
