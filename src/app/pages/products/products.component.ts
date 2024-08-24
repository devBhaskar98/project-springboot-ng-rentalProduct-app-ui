import { Component, inject } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../../models/products.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  productService = inject(ProductService);

  products: Product[] = [];

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        console.log("Product received", data)
        this.products = data;
      },
      error: (err) => {
        console.error('Error fetching products', err);
      },
      complete: () => {
        console.log('Product fetching completed');
      }
    });
  }

}
