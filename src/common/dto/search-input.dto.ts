export interface SearchInputPagination {
    page: number;
    size: number;
  }
  
  export type FilterType<T> = T & { search?: string };
  
  export interface SearchInput<EntityType> {
    filters: FilterType<EntityType>;
    pagination: SearchInputPagination;
    include: string[];
    sorting: {
      [K in keyof EntityType]: 'asc' | 'desc';
    };
  }
  