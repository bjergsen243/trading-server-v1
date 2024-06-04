import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { PaginateResult } from 'mongoose';

export class ErrorMessageDto {
  @ApiProperty({
    type: Number,
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    type: Array,
    example: ['Error message 1', 'Error message 2'],
  })
  message: string[];

  @ApiProperty({
    type: String,
    example: 'Bad Request',
  })
  error: string;
}

export class UnauthorizedResponseDto {
  @ApiProperty({
    type: Number,
    example: 401,
  })
  statusCode: number;

  @ApiProperty({
    type: Array,
    example: ['Unauthorized'],
  })
  message: string[];

  @ApiProperty({
    type: String,
    example: 'Unauthorized',
  })
  error: string;
}

@Exclude()
export class PaginatedResponseDto {
  @Expose()
  @ApiProperty({
    type: Number,
    description: 'Limit',
    example: 10,
  })
  limit: number;

  @Expose()
  @ApiProperty({
    type: Number,
    description: 'Total pages',
    example: 10,
  })
  totalPages: number;

  @Expose()
  @ApiProperty({
    type: Number,
    description: 'Page',
    example: 1,
  })
  page: number;
}

@Exclude()
export class ListResponseDto implements PaginateResult<any> {
  @Expose()
  @ApiProperty({
    type: Number,
    example: 1,
    description:
      'The starting index/serial/chronological number of first document in current page.',
  })
  pagingCounter: number;

  @Expose()
  @ApiProperty({
    type: Number,
    example: 2,
    description: 'Offset',
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
    description:
      'Total number of documents in collection that matched a query.',
  })
  totalDocs: number;

  @Expose()
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Total number of pages.',
  })
  totalPages: number;

  @Expose()
  @ApiProperty({
    type: Number,
    example: 10,
    description: 'Number of documents per page.',
  })
  limit: number;

  @Expose()
  @ApiProperty({
    type: Number,
    example: 1,
    description: 'Current page number.',
  })
  page: number;

  @Expose()
  @ApiProperty({
    isArray: true,
    description: 'Array of documents.',
  })
  docs: any[];

  [customLabel: string]: number | boolean | any[];
}
