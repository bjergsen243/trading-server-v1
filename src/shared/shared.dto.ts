import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

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
