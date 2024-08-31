import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReusableModule} from '../../components/reusable/reusable.module';

@Component({
  selector: 'app-contents',
  standalone: true,
  imports: [CommonModule, ReusableModule],
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss'],
})
export class ContentsComponent {}
