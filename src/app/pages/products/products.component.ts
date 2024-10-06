import {Component, inject, Input, SimpleChanges, OnInit, OnChanges} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {PageRequestDTO, Product} from '../../models/products.model';
import {CommonModule} from '@angular/common';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {Store} from '@ngrx/store';
import {AppState} from 'app/shared/store/store';
import {getAllProducts} from 'app/shared/store/product/product.action';
import {productSelector} from 'app/shared/store/product/product.selector';
import {ReusableModule} from 'app/components/reusable/reusable.module';
import {MatDialog} from '@angular/material/dialog';
import {SidebarComponent} from 'app/components/reusable/sidebar/sidebar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { Router } from '@angular/router';
import { RestoreScrollPositionDirective } from 'app/shared/directive/restore-scroll-position.directive';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReusableModule, MatPaginatorModule, MatSidenavModule, ProductDetailsComponent, RestoreScrollPositionDirective],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnChanges {
  @Input() sortBy: PageRequestDTO = {};
  private readonly store$ = inject(Store<AppState>);
  productService = inject(ProductService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  products$ = this.store$.select(productSelector);

  previousSortByColumn: string | null = null; // To store the last sort column
  products: Product[] = [];
  totalProducts = 0;

  selectedProduct?: Product;

  pageRequestDTO: PageRequestDTO = {
    pageNo: 0,
    pageSize: 9,
  };

  ngOnInit(): void {
    this.store$.dispatch(getAllProducts());

    this.products$.subscribe({
      next: (response) => {
        this.products = response;
      },
    });
    // this.fetchProducts(this.pageRequestDTO);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // check if new sort is requested
    if (changes['sortBy'] && this.sortBy?.sortByColumn) {
      const currentSortByColumn = this.sortBy.sortByColumn;
      const previousSortByColumn = this.previousSortByColumn;
      if (previousSortByColumn !== currentSortByColumn) {
        this.pageRequestDTO = {
          ...this.pageRequestDTO,
          sortByColumn: currentSortByColumn,
        };

        this.fetchProducts(this.pageRequestDTO);
      }
      // Update the previousSortByColumn to the new value
      this.previousSortByColumn = currentSortByColumn;
    }
  }


  // Method to set the selected product
  viewProductDetails(product: Product) {
    this.router.navigate(['/products', product.id]);
  }

  fetchProducts(pageRequestDTO: PageRequestDTO) {
    this.productService.getProductsPaginated(pageRequestDTO).subscribe((response) => {
      console.log(response);
      // FIXME: img property is not added in pagintedRequestResponse DTO
      // this.products = response.content;
      // this.totalProducts = response.totalElements; // Total number of products (needed for paginator)
    });
  }

  onPageChange(event: PageEvent) {
    this.pageRequestDTO.pageNo = event.pageIndex + 1;
    this.pageRequestDTO.pageSize = event.pageSize;
    this.fetchProducts(this.pageRequestDTO);
  }

  openComments(): void {
    console.log('opening');
    this.dialog.open(SidebarComponent, {
      width: '400px',
      data: {
        productName: 'Dummy',
        comments: 'comment', // Pass the product comments
      },
      position: {right: '0px'},
    });
  }
}
