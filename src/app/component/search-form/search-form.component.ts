import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import SearchFileSystemItemRequest from '../../model/SearchFileSystemItemRequest';
import { environment } from '../../../environments/environment';
import { SearchService } from '../../service/SearchService';
import { NavigationService } from '../../service/NavigationService';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css',
})
export class SearchFormComponent implements OnInit {
  searchForm: FormGroup<any> = this.formBuilder.group({
    title: ['', Validators.maxLength(100)],
    publisher: ['', [Validators.maxLength(100)]],
    author: ['', Validators.maxLength(100)],
    description: ['', [Validators.maxLength(100)]],
    year: ['', [Validators.maxLength(4), Validators.pattern('[0-9]{4}')]],
    isbn: ['', Validators.maxLength(100)],
  });

  isAdvanceSearchEnable: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private searchService: SearchService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submitForm(): void {
    if (this.searchForm?.valid) {
      this.isAdvanceSearchEnable = false;
      const searchFileSystemItemRequest: SearchFileSystemItemRequest = {
        title: !!!this.searchForm.value.title
          ? null
          : this.searchForm.value.title,
        publisher: !!!this.searchForm.value.publisher
          ? null
          : this.searchForm.value.publisher,
        author: !!!this.searchForm.value.author
          ? null
          : this.searchForm.value.author,
        description: !!!this.searchForm.value.description
          ? null
          : this.searchForm.value.description,
        year: !!!this.searchForm.value.year ? null : this.searchForm.value.year,
        isbn: !!!this.searchForm.value.isbn ? null : this.searchForm.value.isbn,
        nextCursor: null,
        limit: environment.resultsPerSearch,
      };

      this.router.navigate(['/search']);
      this.searchService.setSearchFileSystemItemRequest(
        searchFileSystemItemRequest
      );
    }
  }

  toggleAdvanceSearch() {
    this.isAdvanceSearchEnable = !this.isAdvanceSearchEnable;
  }
}
