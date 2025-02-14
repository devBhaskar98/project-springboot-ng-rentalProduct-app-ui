import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AnalyticsComponent} from '../../../src/app/pages/analytics/analytics.component';

describe('AnalyticsComponent', () => {
  let component: AnalyticsComponent;
  let fixture: ComponentFixture<AnalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AnalyticsComponent],
    });
    fixture = TestBed.createComponent(AnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
