import { Logger } from "@nestjs/common";
import {
  EntityManager,
  EntityTarget,
  FindOneOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from "typeorm";

import { DeepPartial } from "@type/nullable.type";

import { ID } from "@d-type/id.type";

import { IIdentifiable } from "@domain/common/interfaces/models/identifiable.type";
import { IBasePersistenceRepository } from "@domain/common/interfaces/repositories/base.persistence.repository.type";

import { DefaultTransformer } from "../transformers/default.transformer";
import { ITransformer } from "../transformers/transformer.type";

export abstract class BaseRepository<E extends ObjectLiteral & IIdentifiable, I>
  extends Repository<E>
  implements IBasePersistenceRepository<I>
{
  public logger: Logger;
  public transformer: ITransformer<E, I>;
  public relations: FindOptionsRelations<E>;

  protected constructor(target: EntityTarget<E>, manager: EntityManager) {
    super(target, manager);
    this.transformer = new DefaultTransformer<E, I>();
    this.logger = new Logger(`TYPEORM (${BaseRepository.name})`);
  }

  async getById(id: ID): Promise<I> {
    if (!id) throw Error; // @todo Error

    const entity = await this.findOne({
      relations: this.relations,
      where: { id },
    } as FindOneOptions<E>);

    if (!entity) throw Error; // @todo Error

    this.logger.log(
      `${this.constructor.name}.getById: entity (${id}) successfully found`,
    );

    return this.transformer.persistenceToDomain(entity);
  }

  async getByProperties(properties: FindOptionsWhere<E>): Promise<I> {
    if (!properties) throw Error; // @todo Error

    const entity = await this.findOne({
      relations: this.relations,
      where: properties,
    });

    if (!entity) throw Error; // @todo Error

    this.logger.log(
      `${this.constructor.name}.getByProperties: entity (${entity.id}) successfully found`,
    );

    return this.transformer.persistenceToDomain(entity);
  }

  async getAllByProperties(properties: FindOptionsWhere<E>): Promise<I[]> {
    if (!properties) throw Error; // @todo Error

    try {
      const entities = await this.find({
        relations: this.relations,
        where: properties,
      });

      this.logger.log(
        `${this.constructor.name}.getAllByProperties: entities successfully fetched`,
      );

      return this.transformer.persistenceToDomains(entities);
    } catch (e) {
      throw Error; // @todo Error
    }
  }

  async getAll(): Promise<I[]> {
    try {
      const entities = await this.find({
        relations: this.relations,
      });

      this.logger.log(
        `${this.constructor.name}.getAll: entities successfully fetched`,
      );

      return this.transformer.persistenceToDomains(entities);
    } catch (e) {
      throw Error; // @todo Error
    }
  }

  async createEntity(model: DeepPartial<I>): Promise<I> {
    let id: ID;

    try {
      const entity = await this.save(
        this.transformer.domainToPersistence(model),
      );
      id = entity.id;
    } catch (e) {
      throw Error; // @todo Error
    }

    if (!id) throw Error; // @todo Error

    this.logger.log(
      `${this.constructor.name}.createEntity: entity (${id}) successfully created`,
    );

    return this.getById(id);
  }

  async updateEntity(id: ID, model: DeepPartial<I>): Promise<I> {
    if (!id) throw Error; // @todo Error

    try {
      await this.update(id, this.transformer.domainToPersistence(model));
    } catch (e) {
      throw Error; // @todo Error
    }

    this.logger.log(
      `${this.constructor.name}.updateEntity: entity (${id}) successfully updated`,
    );

    return this.getById(id);
  }

  async deleteEntity(id: ID, hardDelete: boolean = false): Promise<I> {
    if (!id) throw Error; // @todo Error

    const entity = await this.findOne({
      relations: this.relations,
      where: { id },
    } as FindOneOptions<E>);

    if (!entity) throw Error; // @todo Error

    try {
      if (
        hardDelete ||
        !Object.prototype.hasOwnProperty.call(entity, "deletedAt")
      ) {
        await this.delete(id);
      } else {
        await this.softDelete(id);
      }
    } catch (e) {
      throw Error; // @todo Error
    }

    this.logger.log(
      `${this.constructor.name}.deleteEntity: entity (${id}) successfully deleted`,
    );

    return this.transformer.persistenceToDomain(entity);
  }
}
