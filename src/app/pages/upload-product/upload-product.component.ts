import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Product } from '@rentalproduct/models';
import { ProductService } from 'app/service/product.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-upload-product',
  standalone: true,
  imports: [MatSidenavModule, CommonModule, ReactiveFormsModule],
  templateUrl: './upload-product.component.html',
  styleUrl: './upload-product.component.scss'
})
export class UploadProductComponent {
  private productService = inject(ProductService);
  productForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

constructor(
    public dialogRef: MatDialogRef<UploadProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
    
  ) {this.productForm = this.fb.group({
    productName: ['', Validators.required],
    productDetails: ['', Validators.required],
    productImage: [null],
  });}


  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({ productImage: file });
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result);
      reader.readAsDataURL(file);
    }
  }

  submitForm(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('file', this.productForm.get('productImage')?.value);

      const newProduct: Product = {
        name: this.productForm.get('productName')?.value,
        price: 25
      }

      this.productService.createProduct(newProduct).pipe(
        switchMap((newProductCreated: Product) => {
          return this.productService.uploadProductImage(formData);
        })
      ).subscribe({
        next: (response) => {
          console.log('Second service response:', response);
        },
        error: (err) => {
          console.error('Error occurred:', err);
        }
      });

    } else {
      this.productForm.markAllAsTouched();
    }
  }

  closeSidebar(): void {
    this.dialogRef.close();
  }

}
