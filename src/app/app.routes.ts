import { Routes} from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {ContentsComponent} from './pages/contents/contents.component';
import {AnalyticsComponent} from './pages/analytics/analytics.component';
import {CommentsComponent} from './pages/comments/comments.component';
import {ErrorComponent} from './pages/error/error.component';
import {BackendDownComponent} from './pages/backend-down/backend-down.component';
import {ProductDetailsComponent} from './pages/product-details/product-details.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'content',
    component: ContentsComponent,
  },
  {
    path: 'analytics',
    component: AnalyticsComponent,
  },
  {
    path: 'comments',
    component: CommentsComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: 'backendDown',
    component: BackendDownComponent,
  },
  {path: 'products/:id', component: ProductDetailsComponent},
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

