export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
}

export interface PageRequestDTO {
  pageNo: number;
  pageSize: number;
  sort?: string;
  sortByColumn?: string;
}
