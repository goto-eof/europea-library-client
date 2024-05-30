import { Component, OnInit } from '@angular/core';
import UserManagerService from '../../../service/UserManagerService';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import ErrorHandlerUtil from '../../../service/ErrorHandlerUtil';
import User from '../../../model/User';
import CommonGenericCursoredResponse from '../../../model/CommonGenericCursoredResponse';
import CommonGenericCursoredRequest from '../../../model/CommonGenericCursoredRequest';

@Component({
  selector: 'app-cp-user-manager',
  templateUrl: './cp-user-manager.component.html',
  styleUrl: './cp-user-manager.component.css',
})
export class CpUserManagerComponent implements OnInit {
  cursoredItem?: CommonGenericCursoredResponse<User>;
  constructor(
    private userManagerService: UserManagerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userManagerService
      .getAllPaginated({
        limit: environment.NUMBER_OF_USERS_PER_PAGE,
        nextCursor: null,
      })
      .subscribe({
        next: (cursoredItem) => {
          this.cursoredItem = cursoredItem;
        },
        error: (e) => {
          ErrorHandlerUtil.handleError(e, this.router);
        },
      });
  }

  loadMore() {
    const cursoredRequest: CommonGenericCursoredRequest = {
      limit: environment.LIMIT_EXPLORER_BY_DOWNLOAD_COUNT,
      nextCursor: this.cursoredItem?.nextCursor!,
    };
    this.userManagerService.getAllPaginated(cursoredRequest).subscribe({
      next: (cursoredItem) => {
        this.cursoredItem!.childrenList = [
          ...this.cursoredItem!.childrenList,
          ...cursoredItem.childrenList,
        ];
        this.cursoredItem!.nextCursor = cursoredItem.nextCursor;
      },
      error: (e) => {
        ErrorHandlerUtil.handleError(e, this.router);
      },
    });
  }
}
