import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from './button/button.component'; // Import your components
import {FlipCardBackComponent} from './flip-card/flip-card-back';
import {FlipCardFrontComponent} from './flip-card/flip-card-front';
import {FlipCardComponent} from './flip-card/flip-card.component';
import {SidebarComponent} from './sidebar/sidebar.component';
// import { ExampleService } from './example.service'; // Import your services

@NgModule({
  declarations: [
    ButtonComponent, // Declare your components here
    FlipCardComponent,
    FlipCardBackComponent,
    FlipCardFrontComponent,
  ],
  imports: [
    CommonModule, // Import other modules that are required
    SidebarComponent,
  ],
  exports: [
    ButtonComponent, // Export components that you want to use outside this module
    FlipCardComponent,
    FlipCardBackComponent,
    FlipCardFrontComponent,
    SidebarComponent,
  ],
  //   providers: [
  //     ExampleService // Provide services if needed
  //   ]
})
export class ReusableModule {}
