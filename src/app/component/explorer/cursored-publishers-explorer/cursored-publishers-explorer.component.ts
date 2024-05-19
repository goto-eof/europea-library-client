import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import ItemAndFrequency from '../../../model/ItemAndFrequency';
import { Router } from '@angular/router';
import PublisherService from '../../../service/PublisherService';
import ErrorHandlerUtil from '../../../service/ErrorHandlerUtil';
import SnackBarService from '../../../service/SnackBarService';
import AuthService from '../../../service/AuthService';

@Component({
  selector: 'app-cursored-publishers-explorer',
  templateUrl: './cursored-publishers-explorer.component.html',
  styleUrl: './cursored-publishers-explorer.component.css',
})
export class CursoredPublishersExplorerComponent implements OnInit {
  items?: Array<ItemAndFrequency>;
  allItems?: Array<ItemAndFrequency>;
  filter: string = '';
  displayRenameModal = 'none';
  @ViewChild('modalNewValueInput') modalNewValueInputRef?: ElementRef;
  renameSelectedPublisher?: ItemAndFrequency;
  newName = '';

  constructor(
    private publisherService: PublisherService,
    private router: Router,
    private snackBarService: SnackBarService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.reloadAllPublishers();
  }

  reloadAllPublishers() {
    this.publisherService.getPublishers().subscribe({
      next: (data) => {
        this.items = data;
        this.allItems = data;
      },
      error: (e) => {
        ErrorHandlerUtil.handleError(e, this.router);
      },
    });
  }
  exploreItem(
    item: ItemAndFrequency,
    that: CursoredPublishersExplorerComponent
  ) {
    that.router.navigate([`/explore/publisher/${item.name}`]);
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
    publisher: ItemAndFrequency,
    that: CursoredPublishersExplorerComponent
  ) {
    that.displayRenameModal = 'block';
    that.renameSelectedPublisher = publisher;
    setTimeout(() => that.modalNewValueInputRef?.nativeElement.focus(), 1);
  }

  onCloseHandled() {
    this.displayRenameModal = 'none';
  }

  rename(e: any) {
    e.preventDefault();
    const oldName = this.renameSelectedPublisher!.name;
    const newName = this.newName;
    this.publisherService.rename(oldName, newName).subscribe({
      next: (data) => {
        this.snackBarService.showInfoWithMessage(
          data.status ? 'Update done successfully' : 'Nothing to update'
        );
        this.onCloseHandled();
        this.reloadAllPublishers();
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
