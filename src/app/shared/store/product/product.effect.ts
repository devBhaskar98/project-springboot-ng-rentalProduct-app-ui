import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ProductService} from 'app/service/product.service';
import {catchError, map, mergeMap, of, retry} from 'rxjs';
import {getAllProductFailure, getAllProducts, getAllProductSuccess} from './product.action';
import {Product} from '@rentalproduct/models';

@Injectable()
export class ProductEffects {
  private readonly actions$ = inject(Actions);
  private readonly productService = inject(ProductService);
  public router = inject(Router);

  // getAllProduct Effects
  public getAllProductEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getAllProducts),
      mergeMap(() => {
        return this.productService.getAllProductsDummy().pipe(
          retry({
            count: 3, // Retry up to 3 times
            delay: 10, // Delay in milliseconds between retries
          }),
          map((productResult: Product[]) => {
            return getAllProductSuccess({productResult});
          }),
          catchError((error) => {
            return of(getAllProductFailure({error: error}));
          }),
        );
      }),
    );
  });
}
