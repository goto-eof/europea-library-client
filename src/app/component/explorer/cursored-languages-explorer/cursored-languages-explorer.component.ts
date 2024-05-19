import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import ItemAndFrequency from '../../../model/ItemAndFrequency';
import CursoredFileSystemService from '../../../service/CursoredFileSystemService';
import { Router } from '@angular/router';
import LanguageService from '../../../service/LanguageService';
import ErrorHandlerUtil from '../../../service/ErrorHandlerUtil';
import SnackBarService from '../../../service/SnackBarService';
import AuthService from '../../../service/AuthService';

@Component({
  selector: 'app-cursored-languages-explorer',
  templateUrl: './cursored-languages-explorer.component.html',
  styleUrl: './cursored-languages-explorer.component.css',
})
export class CursoredLanguagesExplorerComponent implements OnInit {
  items?: Array<ItemAndFrequency>;
  allItems?: Array<ItemAndFrequency>;
  filter: string = '';
  displayRenameModal = 'none';
  @ViewChild('modalNewValueInput') modalNewValueInputRef?: ElementRef;
  renameSelectedLanguage?: ItemAndFrequency;
  newName = '';

  constructor(
    private languageService: LanguageService,
    private router: Router,
    private snackBarService: SnackBarService,
    private authService: AuthService
  ) {}

  reloadAllLanguages() {
    this.languageService.getLanguages().subscribe({
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
    this.reloadAllLanguages();
  }

  exploreItem(
    item: ItemAndFrequency,
    that: CursoredLanguagesExplorerComponent
  ) {
    that.router.navigate([`/explore/language/${item.name}`]);
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
    language: ItemAndFrequency,
    that: CursoredLanguagesExplorerComponent
  ) {
    that.displayRenameModal = 'block';
    that.renameSelectedLanguage = language;
    setTimeout(() => that.modalNewValueInputRef?.nativeElement.focus(), 1);
  }

  onCloseHandled() {
    this.displayRenameModal = 'none';
  }

  rename(e: any) {
    e.preventDefault();
    const oldName = this.renameSelectedLanguage!.name;
    const newName = this.newName;
    this.languageService.rename(oldName, newName).subscribe({
      next: (data) => {
        this.snackBarService.showInfoWithMessage(
          data.status ? 'Update done successfully' : 'Nothing to update'
        );
        this.onCloseHandled();
        this.reloadAllLanguages();
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
