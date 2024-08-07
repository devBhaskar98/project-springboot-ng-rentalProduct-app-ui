import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button [ngClass]="color" (click)="handleClick()">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .primary { background-color: blue; color: white; }
    .secondary { background-color: gray; color: white; }
  `]
})
export class ButtonComponent {
  @Input() color: 'primary' | 'secondary' = 'primary';

  handleClick() {
    console.log('Button clicked!');
  }
}
