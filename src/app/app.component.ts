import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomSidenavComponent } from "./components/custom-sidenav/custom-sidenav.component";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    CustomSidenavComponent,
    NgMultiSelectDropDownModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  helloText = '';

  constructor(private oauthService: OAuthService, private httpClient: HttpClient) { }

  
  title = 'youtube-sidebar';

  collapsed = signal(true);

  sideNavWidth = computed( () =>  this.collapsed() ? '65px' : '256px')

  logout() {
    console.log("logging out", this.oauthService);
    this.oauthService.logOut();
  }

  getHelloText() {
    this.httpClient.get<{ message: string }>('http://localhost:8080/hello', {
      headers: {
        'Authorization': `Bearer ${this.oauthService.getAccessToken()}`
      }
    }).subscribe(result => {
      this.helloText = result.message;
    });
  }

}
