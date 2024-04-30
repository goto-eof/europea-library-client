import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import CursoredCategoriesService from '../../service/CursoredCategoriesService';
import Cursor from '../../model/Cursor';
import Category from '../../model/Category';
import CommonCursoredRequest from '../../model/CommonCursoredRequest';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import ErrorHandlerUtil from '../../service/ErrorHandlerUtil';
import SnackBarService from '../../service/SnackBarService';
import AuthService from '../../service/AuthService';

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

  allItems: Array<Category> = [];
  filter: string = '';
  intervalId: any;
  isShowMoreButton: boolean = false;
  private isAutoLoadEnabled: boolean = environment.isAutoLoadEnabled;
  private autoLoadTime: number = environment.autoLoadTime;

  displayRenameModal = 'none';
  @ViewChild('modalNewValueInput') modalNewValueInputRef?: ElementRef;
  renameSelectedCategory?: Category;
  newName = '';

  constructor(
    private cursoredCategoriesService: CursoredCategoriesService,
    private router: Router,
    private snackBarService: SnackBarService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.reloadAllCategories();
  }

  reloadAllCategories() {
    this.cursoredCategoriesService.list().subscribe({
      next: (data) => {
        this.categories = data;
        this.allItems = data.items;
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
        that.allItems = [...that.allItems, ...data.items];
        that.categories.nextCursor = data.nextCursor;
      },
      error: (e) => {
        ErrorHandlerUtil.handleError(e, this.router);
      },
    });
  }

  goToCategory(category: Category, that: CategoriesExplorerComponent) {
    that.router.navigate([`/explorer/category/${category.id}`]);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  filterItems() {
    const filterString = this.filter.trim().toLocaleLowerCase();
    if (!filterString) {
      this.categories.items = this.allItems || [];
      return;
    }
    this.categories.items =
      this.allItems?.filter(
        (item) =>
          item.name.trim().toLocaleLowerCase().indexOf(filterString) > -1
      ) || [];
  }

  openModal(category: Category, that: CategoriesExplorerComponent) {
    that.displayRenameModal = 'block';
    that.renameSelectedCategory = category;
    setTimeout(() => that.modalNewValueInputRef?.nativeElement.focus(), 1);
  }

  onCloseHandled() {
    this.displayRenameModal = 'none';
  }

  rename(e: any) {
    e.preventDefault();
    const oldName = this.renameSelectedCategory!.name;
    const newName = this.newName;
    this.cursoredCategoriesService.rename(oldName, newName).subscribe({
      next: (data) => {
        this.snackBarService.showInfoWithMessage(
          data.status ? 'Update done successfully' : 'Nothing to update'
        );
        this.onCloseHandled();
        this.reloadAllCategories();
        this.newName = '';
      },
      error: (e: any) => {
        this.snackBarService.showErrorWithMessage(
          'Something went wrong: ' + e.message
        );
      },
    });
  }

  isAdminAuthenticated(): any {
    return this.authService.isAdminAuthenticated();
  }
}
