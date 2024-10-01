import {ActionReducer} from '@ngrx/store';
import {ProductState} from './product/product.state';
import {productReducer} from './product/product.reducer';
import {ProductEffects} from './product/product.effect';

export interface AppState {
  product: ProductState;
}

export interface AppStore {
  product: ActionReducer<ProductState>;
}

export const appStore: AppStore = {
  product: productReducer,
};

export const appEffects = [ProductEffects];
