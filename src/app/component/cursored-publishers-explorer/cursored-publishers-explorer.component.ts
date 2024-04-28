import { Component, OnInit } from '@angular/core';
import CursoredFileSystemService from '../../service/CursoredFileSystemService';
import ItemAndFrequency from '../../model/ItemAndFrequency';
import { Router } from '@angular/router';
import PublisherService from '../../service/PublisherService';

@Component({
  selector: 'app-cursored-publishers-explorer',
  templateUrl: './cursored-publishers-explorer.component.html',
  styleUrl: './cursored-publishers-explorer.component.css',
})
export class CursoredPublishersExplorerComponent implements OnInit {
  items?: Array<ItemAndFrequency>;

  constructor(
    private publisherService: PublisherService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.publisherService.getPublishers().subscribe((data) => {
      this.items = data;
    });
  }
  exploreItem(item: ItemAndFrequency) {
    this.router.navigate([`/explore/publisher/${item.name}`]);
  }
}
