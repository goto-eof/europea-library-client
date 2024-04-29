import { Component, OnInit } from '@angular/core';
import ItemAndFrequency from '../../model/ItemAndFrequency';
import CursoredFileSystemService from '../../service/CursoredFileSystemService';
import { Router } from '@angular/router';
import LanguageService from '../../service/LanguageService';
import ErrorHandlerUtil from '../../service/ErrorHandlerUtil';

@Component({
  selector: 'app-cursored-languages-explorer',
  templateUrl: './cursored-languages-explorer.component.html',
  styleUrl: './cursored-languages-explorer.component.css',
})
export class CursoredLanguagesExplorerComponent implements OnInit {
  items?: Array<ItemAndFrequency>;

  constructor(
    private languageService: LanguageService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.languageService.getLanguages().subscribe({
      next: (data) => {
        this.items = data;
      },
      error: (e) => {
        ErrorHandlerUtil.handleError(e, this.router);
      },
    });
  }
  exploreItem(item: ItemAndFrequency) {
    this.router.navigate([`/explore/language/${item.name}`]);
  }
}
