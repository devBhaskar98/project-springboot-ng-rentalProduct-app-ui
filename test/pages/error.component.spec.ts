import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorComponent } from '../../src/app/pages/error/error.component'

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorComponent] // As the component is standalone, import it here
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the ErrorComponent', () => {
    expect(component).toBeTruthy();
  });
});
