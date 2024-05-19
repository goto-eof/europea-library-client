import { Component, Input } from '@angular/core';
import StripeProduct from '../../../model/StripeProduct';
import StripePrice from '../../../model/StripePrice';
import FileMetaInfo from '../../../model/FileMetaInfo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css',
})
export class BookCardComponent {
  @Input('product')
  product!: StripeProduct;

  @Input('price')
  price!: StripePrice;

  @Input('fileMetaInfo')
  fileMetaInfo!: FileMetaInfo;

  constructor(private router: Router) {}

  goToFileInfo() {
    this.router.navigate([`/file-info/fileMetaInfoId/${this.fileMetaInfo.id}`]);
  }
}
