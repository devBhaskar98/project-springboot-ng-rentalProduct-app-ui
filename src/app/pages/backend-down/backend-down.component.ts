import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-backend-down',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './backend-down.component.html',
  styleUrl: './backend-down.component.scss'
})
export class BackendDownComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { errorMessage: string }) {}

  ngOnit(): void {
    
  }

}
