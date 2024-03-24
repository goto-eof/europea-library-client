import { Component, Input, OnInit } from '@angular/core';
import FileMetaInfoBook from '../../model/FileMetaInfoBook';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
})
export class RatingComponent implements OnInit {
  @Input('bookInfo') bookInfo!: FileMetaInfoBook;
  stars: Array<string>;
  constructor() {
    this.stars = Array(5).map((x, i) =>
      i <= this.bookInfo.averageRating ? '★' : '☆'
    );
  }

  ngOnInit(): void {}
}
