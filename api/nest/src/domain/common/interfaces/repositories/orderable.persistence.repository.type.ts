export interface IOrderablePersistenceRepository<T> {
  pushUp(id: number): Promise<T>;

  pushDown(id: number): Promise<T>;
}
