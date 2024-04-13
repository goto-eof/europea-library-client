import { Component, OnDestroy, OnInit } from '@angular/core';
import Cursor from '../../model/Cursor';
import Tag from '../../model/Tag';
import CursoredTagService from '../../service/CursoredTagService';
import CommonCursoredRequest from '../../model/CommonCursoredRequest';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

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
  intervalId: any;
  isShowMoreButton: boolean = false;
  private isAutoLoadEnabled: boolean = environment.isAutoLoadEnabled;
  private autoLoadTime: number = environment.autoLoadTime;

  constructor(
    private cursoredTaxService: CursoredTagService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  ngOnInit(): void {
    this.cursoredTaxService.list().subscribe((data) => {
      this.tags = data;
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
    });
  }

  loadMore(that: CursoredTagExplorerComponent) {
    const request: CommonCursoredRequest = {
      limit: environment.tagsPerRequest,
      nextCursor: that.tags.nextCursor,
    };
    that.cursoredTaxService.list(request).subscribe((data: Cursor<Tag>) => {
      that.tags.items = [...that.tags.items, ...data.items];
      that.tags.nextCursor = data.nextCursor;
    });
  }

  goToTag(tag: Tag) {
    this.router.navigate([`/explorer/tag/${tag.id}`]);
  }
}
