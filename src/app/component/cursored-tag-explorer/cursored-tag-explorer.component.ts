import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import Cursor from '../../model/Cursor';
import Tag from '../../model/Tag';
import CursoredTagService from '../../service/CursoredTagService';
import CommonCursoredRequest from '../../model/CommonCursoredRequest';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import ErrorHandlerUtil from '../../service/ErrorHandlerUtil';
import SnackBarService from '../../service/SnackBarService';
import AuthService from '../../service/AuthService';

@Component({
  selector: 'app-cursored-tag-explorer',
  templateUrl: './cursored-tag-explorer.component.html',
  styleUrl: './cursored-tag-explorer.component.css',
})
export class CursoredTagExplorerComponent implements OnInit, OnDestroy {
  tags: Cursor<Tag> = {
    items: [],
    nextCursor: null,
  };
  allItems: Array<Tag> = [];
  filter: string = '';
  intervalId: any;
  isShowMoreButton: boolean = false;
  private isAutoLoadEnabled: boolean = environment.isAutoLoadEnabled;
  private autoLoadTime: number = environment.autoLoadTime;

  displayRenameModal = 'none';
  @ViewChild('modalNewValueInput') modalNewValueInputRef?: ElementRef;
  renameSelectedTag?: Tag;
  newName = '';

  constructor(
    private cursoredTagService: CursoredTagService,
    private router: Router,
    private snackBarService: SnackBarService,
    private authService: AuthService
  ) {}
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  reloadAllTags() {
    this.cursoredTagService.list().subscribe({
      next: (data) => {
        this.tags = data;
        this.allItems = data.items;
        const loadMore = this.loadMore;
        const that = this;
        if (this.isAutoLoadEnabled) {
          this.intervalId = window.setInterval(function () {
            if (data.nextCursor) {
              loadMore(that);
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

  ngOnInit(): void {
    this.reloadAllTags();
  }

  loadMore(that: CursoredTagExplorerComponent) {
    const request: CommonCursoredRequest = {
      limit: environment.tagsPerRequest,
      nextCursor: that.tags.nextCursor,
    };
    that.cursoredTagService.list(request).subscribe({
      next: (data: Cursor<Tag>) => {
        that.tags.items = [...that.tags.items, ...data.items];
        that.allItems = [...that.allItems, ...data.items];
        that.tags.nextCursor = data.nextCursor;
      },
      error: (e) => {
        ErrorHandlerUtil.handleError(e, this.router);
      },
    });
  }

  goToTag(tag: Tag, that: CursoredTagExplorerComponent) {
    that.router.navigate([`/explorer/tag/${tag.id}`]);
  }

  filterItems() {
    const filterString = this.filter.trim().toLocaleLowerCase();
    if (!filterString) {
      this.tags.items = this.allItems || [];
      return;
    }
    this.tags.items =
      this.allItems?.filter(
        (item) =>
          item.name.trim().toLocaleLowerCase().indexOf(filterString) > -1
      ) || [];
  }

  openModal(tag: Tag, that: CursoredTagExplorerComponent) {
    that.displayRenameModal = 'block';
    that.renameSelectedTag = tag;
    setTimeout(() => that.modalNewValueInputRef?.nativeElement.focus(), 1);
  }

  onCloseHandled() {
    this.displayRenameModal = 'none';
  }

  rename(e: any) {
    e.preventDefault();
    const oldName = this.renameSelectedTag!.name;
    const newName = this.newName;
    this.cursoredTagService.rename(oldName, newName).subscribe({
      next: (data) => {
        this.snackBarService.showInfoWithMessage(
          data.status ? 'Update done successfully' : 'Nothing to update'
        );
        this.onCloseHandled();
        this.reloadAllTags();
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
