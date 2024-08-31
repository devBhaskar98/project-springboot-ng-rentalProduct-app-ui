import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReusableModule} from '../../components/reusable/reusable.module';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, ReusableModule],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent {}
