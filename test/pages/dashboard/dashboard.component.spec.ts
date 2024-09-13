import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from '../../../src/app/pages/dashboard/dashboard.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common'; // For common Angular directives
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'; // Importing the dropdown module if used in your component
import { HttpClientModule } from '@angular/common/http';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule, // Import if the component uses common directives
        NoopAnimationsModule,
        NgMultiSelectDropDownModule, // Import the dropdown module if used in your component
        DashboardComponent,
        HttpClientModule
      ],
    }).compileComponents(); // Ensure to compile components before creating fixture

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
