import {
  FilterQuery,
  Model,
  PaginateModel,
  QueryOptions,
  SaveOptions,
  UpdateQuery,
} from 'mongoose';

export abstract class BaseRepository<T> {
  public model: Model<T & Document>;
  public modelPagination: PaginateModel<T & Document>;
  public collectionName: string;

  constructor(model: Model<T & Document> | PaginateModel<T & Document>) {
    this.model = model;
    if (model.hasOwnProperty('paginate')) {
      this.modelPagination = model as PaginateModel<T & Document>;
    }
    this.collectionName = model.collection.name;
  }

  async create(doc: T, options?: SaveOptions) {
    return new this.model(doc).save(options);
  }

  async findOne(
    filter?: FilterQuery<T & Document>,
    projection?: Partial<Record<keyof T, 1 | 0>>,
    options?: QueryOptions,
  ): Promise<T & Document> {
    return this.model.findOne(filter, projection, options).lean();
  }

  async findOneAndUpdate(
    filter?: FilterQuery<T & Document>,
    update?: UpdateQuery<T & Document>,
    options?: QueryOptions | null,
  ): Promise<T & Document> {
    return await this.model.findOneAndUpdate(filter, update, options);
  }
}
