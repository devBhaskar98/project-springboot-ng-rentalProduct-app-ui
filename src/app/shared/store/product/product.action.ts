import {createAction, props} from '@ngrx/store';
import {Product} from '@rentalproduct/models';

export const getAllProducts = createAction('[PRODUCT] get all products');

export const getAllProductSuccess = createAction(
  '[PRODUCT] get all product Success',
  props<{productResult: Product[]}>(),
);

export const getAllProductFailure = createAction(
  '[PRODUCT] get all product failure',
  props<{error: unknown}>(),
);
