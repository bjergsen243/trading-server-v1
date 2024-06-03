import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { PaginateResult } from 'mongoose';

@Exclude()
export class ListResponseDto<T> implements PaginateResult<any> {
  @Expose()
  @ApiProperty({
    type: Number,
    example: 1,
    description:
      'The starting index/serial/chronological number of first document in current page',
  })
  pagingCounter: number;

  @Expose()
  @ApiProperty({
    type: Number,
    example: 2,
    description: 'skip position',
  })
  offset: number;

  @Expose()
  @ApiProperty({
    type: Boolean,
    example: false,
  })
  hasNextPage: boolean;

  @Expose()
  @ApiProperty({
    example: true,
    type: Boolean,
  })
  hasPrevPage: boolean;

  @Expose()
  @ApiProperty({
    type: Number,
    example: 10,
    description: 'Total number of documents in collection that matched a query',
  })
  totalDocs: number;

  @Expose()
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Total number of pages',
  })
  totalPages: number;

  @Expose()
  @ApiProperty({
    type: Number,
    example: 10,
    description: 'Number of documents per page',
  })
  limit: number;

  @Expose()
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Current page number',
  })
  page: number;

  @Expose()
  @ApiProperty({
    isArray: true,
    description: 'Array of documents',
  })
  docs: T[];

  [customLabel: string]: number | boolean | any[];
}
