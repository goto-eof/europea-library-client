import { Component, OnInit } from '@angular/core';
import Cursor from '../../model/Cursor';
import Tag from '../../model/Tag';
import CursoredTagService from '../../service/CursoredTagService';
import CommonCursoredRequest from '../../model/CommonCursoredRequest';

@Component({
  selector: 'app-cursored-tag-explorer',
  templateUrl: './cursored-tag-explorer.component.html',
  styleUrl: './cursored-tag-explorer.component.css',
})
export class CursoredTagExplorerComponent implements OnInit {
  tags: Cursor<Tag> = {
    items: [],
    nextCursor: null,
  };
  isShowMoreButton: boolean = false;

  constructor(private cursoredTaxService: CursoredTagService) {}

  ngOnInit(): void {
    this.cursoredTaxService.list().subscribe((data) => {
      this.tags = data;
    });
  }

  loadMore() {
    const request: CommonCursoredRequest = {
      limit: 10,
      nextCursor: this.tags.nextCursor,
    };
    this.cursoredTaxService.list(request).subscribe((data) => {
      this.tags.items = [...this.tags.items, ...data.items];
      this.tags.nextCursor = data.nextCursor;
    });
  }
}
