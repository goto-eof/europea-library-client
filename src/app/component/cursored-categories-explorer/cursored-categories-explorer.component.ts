import { Component, OnDestroy, OnInit } from '@angular/core';
import CursoredCategoriesService from '../../service/CursoredCategoriesService';
import Cursor from '../../model/Cursor';
import Category from '../../model/Category';
import CommonCursoredRequest from '../../model/CommonCursoredRequest';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import ErrorHandlerUtil from '../../service/ErrorHandlerUtil';

@Component({
  selector: 'app-cursored-categories-explorer',
  templateUrl: './cursored-categories-explorer.component.html',
  styleUrl: './cursored-categories-explorer.component.css',
})
export class CategoriesExplorerComponent implements OnInit, OnDestroy {
  categories: Cursor<Category> = {
    items: [],
    nextCursor: null,
  };
  intervalId: any;
  isShowMoreButton: boolean = false;
  private isAutoLoadEnabled: boolean = environment.isAutoLoadEnabled;
  private autoLoadTime: number = environment.autoLoadTime;

  constructor(
    private cursoredCategoriesService: CursoredCategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cursoredCategoriesService.list().subscribe({
      next: (data) => {
        this.categories = data;
        const that = this;
        if (this.isAutoLoadEnabled) {
          this.intervalId = window.setInterval(function () {
            if (data.nextCursor) {
              that.loadMore(that);
            } else {
              clearInterval(that.intervalId);
            }
          }, this.autoLoadTime);
        }
      },
      error: (e) => {
        ErrorHandlerUtil.handleError(e, this.router);
      },
    });
  }

  loadMore(that: CategoriesExplorerComponent) {
    const request: CommonCursoredRequest = {
      limit: environment.categoriesPerRequest,
      nextCursor: that.categories.nextCursor,
    };
    that.cursoredCategoriesService.list(request).subscribe({
      next: (data: Cursor<Category>) => {
        that.categories.items = [...that.categories.items, ...data.items];
        that.categories.nextCursor = data.nextCursor;
      },
      error: (e) => {
        ErrorHandlerUtil.handleError(e, this.router);
      },
    });
  }

  goToCategory(category: Category) {
    this.router.navigate([`/explorer/category/${category.id}`]);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
