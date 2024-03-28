import { Component, OnInit } from '@angular/core';
import CursoredCategoriesService from '../../service/CursoredCategoriesService';
import Cursor from '../../model/Cursor';
import Category from '../../model/Category';
import CommonCursoredRequest from '../../model/CommonCursoredRequest';

@Component({
  selector: 'app-cursored-categories-explorer',
  templateUrl: './cursored-categories-explorer.component.html',
  styleUrl: './cursored-categories-explorer.component.css',
})
export class CategoriesExplorerComponent implements OnInit {
  categories: Cursor<Category> = {
    items: [],
    nextCursor: null,
  };
  isShowMoreButton: boolean = false;

  constructor(private cursoredCategoriesService: CursoredCategoriesService) {}

  ngOnInit(): void {
    this.cursoredCategoriesService.list().subscribe((data) => {
      this.categories = data;
    });
  }

  loadMore() {
    const request: CommonCursoredRequest = {
      limit: 10,
      nextCursor: this.categories.nextCursor,
    };
    this.cursoredCategoriesService.list(request).subscribe((data) => {
      this.categories.items = [...this.categories.items, ...data.items];
      this.categories.nextCursor = data.nextCursor;
    });
  }
}
