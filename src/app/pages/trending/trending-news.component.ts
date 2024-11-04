import {CommonModule} from '@angular/common';
import {Component, inject, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import {News} from '@rentalproduct/models';
import {NewsService} from 'app/service/news.service';

@Component({
  selector: 'app-trending-news',
  standalone: true,
  imports: [MatSidenavModule, CommonModule],
  templateUrl: './trending-news.component.html',
  styleUrl: './trending-news.component.scss',
})
export class TrendingNewsComponent {
  private newsService = inject(NewsService);
  public news: News[] = [];
  constructor(
    public dialogRef: MatDialogRef<TrendingNewsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.loadNews();
  }

  public loadNews = () => {
    this.newsService.getMockNews().subscribe((response) => {
      this.news = response;
    });
  };

  closeSidebar(): void {
    this.dialogRef.close();
  }
}
