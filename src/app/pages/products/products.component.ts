import {Component, inject} from '@angular/core';
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
export class ProductsComponent {
  productService = inject(ProductService);

  products: Product[] = [];

  totalProducts = 0;

  pageRequestDTO: PageRequestDTO = {
    pageNo: 0,
    pageSize: 2,
  };

  ngOnInit(): void {
    this.fetchProducts(this.pageRequestDTO);
  }

  fetchProducts(pageRequestDTO: PageRequestDTO) {
    this.productService.getProductsPaginated(pageRequestDTO).subscribe((response) => {
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
