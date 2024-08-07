import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component'; // Import your components
// import { ExampleService } from './example.service'; // Import your services

@NgModule({
  declarations: [
    ButtonComponent // Declare your components here
  ],
  imports: [
    CommonModule // Import other modules that are required
  ],
  exports: [
    ButtonComponent // Export components that you want to use outside this module
  ],
//   providers: [
//     ExampleService // Provide services if needed
//   ]
})
export class ReusableModule { }
