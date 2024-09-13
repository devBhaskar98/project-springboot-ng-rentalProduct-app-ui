import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BackendDownComponent } from '../../src/app/pages/backend-down/backend-down.component';
import { MatButtonModule } from '@angular/material/button';

describe('BackendDownComponent', () => {
  let component: BackendDownComponent;
  let fixture: ComponentFixture<BackendDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatButtonModule, MatDialogModule, BackendDownComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { errorMessage: 'Test Error' } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the BackendDownComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display the error message', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Test Error');
  });
});