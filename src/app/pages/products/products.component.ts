import {Component, inject, Input, SimpleChanges, OnInit, OnChanges} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {PageRequestDTO, Product} from '../../models/products.model';
import {CommonModule} from '@angular/common';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnChanges {
  @Input() sortBy: PageRequestDTO = {};
  productService = inject(ProductService);

  previousSortByColumn: string | null = null;  // To store the last sort column
  products: Product[] = [];
  totalProducts = 0;

  pageRequestDTO: PageRequestDTO = {
    pageNo: 0,
    pageSize: 9,
  };

  ngOnInit(): void {
    this.fetchProducts(this.pageRequestDTO);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // check if new sort is requested
    if (changes['sortBy'] && this.sortBy?.sortByColumn) {
      const currentSortByColumn = this.sortBy.sortByColumn;
      const previousSortByColumn = this.previousSortByColumn;
      if (previousSortByColumn !== currentSortByColumn) {

        this.pageRequestDTO = {
          ...this.pageRequestDTO,
          sortByColumn: currentSortByColumn
        }

        this.fetchProducts(this.pageRequestDTO);
      } 
      // Update the previousSortByColumn to the new value
      this.previousSortByColumn = currentSortByColumn;
    }
  }

  fetchProducts(pageRequestDTO: PageRequestDTO) {
    this.productService.getProductsPaginated(pageRequestDTO).subscribe((response) => {
      console.log(response)
      this.products = response.content;
      this.totalProducts = response.totalElements; // Total number of products (needed for paginator)
    });
  }

  onPageChange(event: PageEvent) {
    this.pageRequestDTO.pageNo = event.pageIndex + 1;
    this.pageRequestDTO.pageSize = event.pageSize;
    this.fetchProducts(this.pageRequestDTO);
  }
}
