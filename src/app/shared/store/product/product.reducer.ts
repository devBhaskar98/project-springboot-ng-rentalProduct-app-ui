import {createReducer, on} from '@ngrx/store';
import {initialProductState} from './product.state';
import { getAllProductFailure, getAllProducts, getAllProductSuccess} from './product.action';

export const productReducer = createReducer(
  initialProductState,

  on(getAllProducts, (state) => {
    return {...state, ...initialProductState};
  }),

  on(getAllProductSuccess, (state, { productResult }) => {
    return {...state, products: productResult, loading: false, error: null};
  }),

  on(getAllProductFailure, (state, { error }) => {
    return {
      ...state,
      products: [], // Clear products on failure
      loading: false, // Stop loading on failure
      error: error // Store the error
    };
  }),
);
