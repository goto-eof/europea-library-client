import { Component, OnInit } from '@angular/core';
import { StripePurchasesService } from '../../../service/StripePurchasesService';
import StripeCustomerProductsOwned from '../../../model/StripeCustomerProductsOwned';
import GenericCursoredResponse from '../../../model/GenericCursoredResponse';
import { environment } from '../../../../environments/environment';
import ErrorHandlerUtil from '../../../service/ErrorHandlerUtil';
import { Router } from '@angular/router';
import GenericCursoredRequest from '../../../model/GenericCursoredRequest';
import FileMetaInfo from '../../../model/FileMetaInfo';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.css',
})
export class PurchasesComponent implements OnInit {
  cursoredItem?: GenericCursoredResponse<string, StripeCustomerProductsOwned>;

  constructor(
    private stripePurchasesService: StripePurchasesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.stripePurchasesService
      .retrieveCursoredPurchases({
        limit: environment.LIMIT_EXPLORER_BY_PUBLISHER,
        nextCursor: null,
        parent: 'purchases',
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
    const cursoredRequest: GenericCursoredRequest<string> = {
      limit: environment.LIMIT_EXPLORER_BY_PUBLISHER,
      nextCursor: this.cursoredItem?.nextCursor!,
      parent: this.cursoredItem?.parent!,
    };
    this.stripePurchasesService
      .retrieveCursoredPurchases(cursoredRequest)
      .subscribe({
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
