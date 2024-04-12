import { Component, OnInit } from '@angular/core';
import CursoredCategoriesService from '../../service/CursoredCategoriesService';
import Cursor from '../../model/Cursor';
import Category from '../../model/Category';
import CommonCursoredRequest from '../../model/CommonCursoredRequest';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

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
  private isAutoLoadEnabled: boolean = environment.isAutoLoadEnabled;
  private autoLoadTime: number = environment.autoLoadTime;

  constructor(
    private cursoredCategoriesService: CursoredCategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cursoredCategoriesService.list().subscribe((data) => {
      this.categories = data;
      const that = this;
      if (this.isAutoLoadEnabled) {
        var intervalId = window.setInterval(function () {
          if (data.nextCursor) {
            that.loadMore(that);
          } else {
            clearInterval(intervalId);
          }
        }, this.autoLoadTime);
      }
    });
  }

  loadMore(that: CategoriesExplorerComponent) {
    const request: CommonCursoredRequest = {
      limit: environment.categoriesPerRequest,
      nextCursor: that.categories.nextCursor,
    };
    that.cursoredCategoriesService
      .list(request)
      .subscribe((data: Cursor<Category>) => {
        that.categories.items = [...that.categories.items, ...data.items];
        that.categories.nextCursor = data.nextCursor;
      });
  }

  goToCategory(category: Category) {
    this.router.navigate([`/explorer/category/${category.id}`]);
  }
}
