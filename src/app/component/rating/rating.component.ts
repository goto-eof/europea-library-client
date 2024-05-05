import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
})
export class RatingComponent implements OnInit {
  @Input('averageRating') averageRating!: number;
  @Input('ratingsCount') ratingsCount!: number;
  stars: Array<string>;
  constructor() {
    this.stars = Array(5).map((x, i) => (i <= this.averageRating! ? '★' : '☆'));
  }

  ngOnInit(): void {}
}
