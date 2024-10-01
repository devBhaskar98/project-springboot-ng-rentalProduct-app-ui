import {Product} from '@rentalproduct/models';

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: unknown | null;
}

export const initialProductState: ProductState = {
  products: [
    {
      id: 1,
      name: 'product_1',
      description: '',
      price: 10,
    },
  ],
  loading: false,
  error: null,
};
