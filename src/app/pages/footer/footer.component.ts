import {Component, ElementRef, inject, Renderer2, ViewChild, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements AfterViewInit {
  private readonly renderer = inject(Renderer2);
  currentYear: string = '2024';

  @ViewChild('footer', {static: false}) footerElement!: ElementRef;

  footerHeight = 100;

  ngAfterViewInit(): void {
    // Get the footer height dynamically after the view is initialized
    if (this.footerElement) {
      this.footerHeight = this.footerElement.nativeElement.offsetHeight;
      this.adjustSidenavHeight();
    }
  }

  adjustSidenavHeight() {
    const container = document.querySelector('mat-sidenav-container') as HTMLElement;
    if (container) {
      const availableHeight = `calc(100vh - ${this.footerHeight * 2.5}px)`;
      this.renderer.setStyle(container, 'height', availableHeight);
    }
  }
}
