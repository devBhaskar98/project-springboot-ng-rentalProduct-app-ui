

import { createSelector } from '@ngrx/store';
import { AppState } from '../store';
import { ProductState } from './product.state';

export const productState = (state: AppState): ProductState => {
  return state.product;
};

export const journeySelector = createSelector(
    productState,
  (productSlice: ProductState) => {
    return productSlice.products;
  },
);

