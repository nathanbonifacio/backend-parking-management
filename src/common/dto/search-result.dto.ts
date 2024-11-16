import { ApiProperty } from '@nestjs/swagger';

interface SearchResultPagination {
  total: number;
  pages: number;
}

export class SearchResult<T> {
  @ApiProperty({
    description:
      'Field containing the description of the current pagination information for the given query.',
  })
  pagination: SearchResultPagination;

  @ApiProperty({
    description:
      'Field containing an array of results based on the given query search.',
  })
  data: T[];
}
