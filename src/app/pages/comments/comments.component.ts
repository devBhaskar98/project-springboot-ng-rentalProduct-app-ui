import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import { CommentService } from 'app/service/comment.service';
import { Comments } from '@rentalproduct/models';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {

  comments: Comments[] = [{
    id: 1,
    comment: 'This is a sample comment.'
  }];

  private readonly commentService = inject(CommentService)

  ngOnInit(): void {
    this.fetchComment()
  }

  fetchComment() {
    this.commentService.getComment().subscribe(response => {
      this.comments = response;
    })
  }

}
