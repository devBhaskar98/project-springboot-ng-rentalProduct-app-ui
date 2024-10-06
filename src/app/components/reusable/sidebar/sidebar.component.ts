import {CommonModule} from '@angular/common';
import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatSidenavModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(
    public dialogRef: MatDialogRef<SidebarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  closeSidebar(): void {
    this.dialogRef.close();
  }
}
