import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CommentsComponent} from '../../../src/app/pages/comments/comments.component';
import {HttpClientModule} from '@angular/common/http';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommentsComponent, HttpClientModule],
    });
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
