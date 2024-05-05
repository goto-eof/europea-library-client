import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
})
export class RatingComponent implements OnInit {
  @Input('averageRating') averageRating!: number;
  @Input('ratingsCount') ratingsCount!: number;
  stars: Array<string> = ['☆', '☆', '☆', '☆', '☆'];
  constructor() {}

  ngOnInit(): void {
    if (this.averageRating > 5) {
      this.averageRating = 5;
    }
    this.stars = this.stars.map((_, i) =>
      i + 1 <= this.averageRating ? '★' : '☆'
    );
  }
}
