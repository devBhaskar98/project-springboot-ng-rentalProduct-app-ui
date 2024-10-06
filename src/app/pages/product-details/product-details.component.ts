import {Component, inject, Input} from '@angular/core';
import {Router} from '@angular/router';
import {Product} from '@rentalproduct/models';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  // @Input() product!: Product; // Input property to receive th  e product details
  private router = inject(Router);

  close() {
    this.router.navigate(['/products']); // Navigate to the products route
  }
}
