import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import ItemAndFrequency from '../../../model/ItemAndFrequency';
import PublishedDateService from '../../../service/PublishedDateService';
import { Router } from '@angular/router';
import SnackBarService from '../../../service/SnackBarService';
import AuthService from '../../../service/AuthService';
import ErrorHandlerUtil from '../../../service/ErrorHandlerUtil';

@Component({
  selector: 'app-published-date-explorer',
  templateUrl: './published-date-explorer.component.html',
  styleUrl: './published-date-explorer.component.css',
})
export class PublishedDateExplorerComponent implements OnInit {
  items?: Array<ItemAndFrequency>;
  allItems?: Array<ItemAndFrequency>;
  filter: string = '';
  displayRenameModal = 'none';
  @ViewChild('modalNewValueInput') modalNewValueInputRef?: ElementRef;
  renameSelectedItem?: ItemAndFrequency;
  newName = '';

  constructor(
    private publishedDateService: PublishedDateService,
    private router: Router,
    private snackBarService: SnackBarService,
    private authService: AuthService
  ) {}

  reloadAllItems() {
    this.publishedDateService.getPublishedDates().subscribe({
      next: (data) => {
        this.items = data;
        this.allItems = data;
      },
      error: (e) => {
        ErrorHandlerUtil.handleError(e, this.router);
      },
    });
  }

  ngOnInit(): void {
    this.reloadAllItems();
  }

  exploreItem(item: ItemAndFrequency, that: PublishedDateExplorerComponent) {
    that.router.navigate([`/explore/published-date/${item.name}`]);
  }

  filterItems() {
    const filterString = this.filter.trim().toLocaleLowerCase();
    if (!filterString) {
      this.items = this.allItems;
      return;
    }
    this.items = this.allItems?.filter(
      (item) => item.name.trim().toLocaleLowerCase().indexOf(filterString) > -1
    );
  }

  openModal(
    publishedDate: ItemAndFrequency,
    that: PublishedDateExplorerComponent
  ) {
    that.displayRenameModal = 'block';
    that.renameSelectedItem = publishedDate;
    setTimeout(() => that.modalNewValueInputRef?.nativeElement.focus(), 1);
  }

  onCloseHandled() {
    this.displayRenameModal = 'none';
  }

  rename(e: any) {
    e.preventDefault();
    const oldName = this.renameSelectedItem!.name;
    const newName = this.newName;
    this.publishedDateService.rename(oldName, newName).subscribe({
      next: (data) => {
        this.snackBarService.showInfoWithMessage(
          data.status ? 'Update done successfully' : 'Nothing to update'
        );
        this.onCloseHandled();
        this.reloadAllItems();
        this.newName = '';
      },
      error: (e) => {
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
