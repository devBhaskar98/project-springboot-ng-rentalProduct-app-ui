
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
}

export interface PageRequestDTO {
  pageNo?: number;
  pageSize?: number;
  sort?: string;
  sortByColumn?: string;
}

export interface ProductResponse {
  id: number,
  name: string,
  price: number
}

export interface PageableResponse {
  pageNumber: number,
  pageSize: number,
  sort: {
    empty: boolean,
    sorted: boolean,
    unsorted: boolean
  },
  offset: number,
  unpaged: boolean,
  paged: boolean

}

export interface ProductPaginatedResponse {
  content: ProductResponse[],
  pageable: PageableResponse,
  last: boolean,
  totalPages: number,
  totalElements: number,
  first: boolean,
  size: number,
  number: number,
  sort: {
    empty: boolean,
    sorted: boolean,
    unsorted: boolean
  },
  numberOfElements: number,
  empty: boolean
}