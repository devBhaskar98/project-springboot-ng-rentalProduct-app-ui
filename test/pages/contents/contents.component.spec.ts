import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ContentsComponent} from '../../../src/app/pages/contents/contents.component';

describe('ContentsComponent', () => {
  let component: ContentsComponent;
  let fixture: ComponentFixture<ContentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ContentsComponent],
    });
    fixture = TestBed.createComponent(ContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
