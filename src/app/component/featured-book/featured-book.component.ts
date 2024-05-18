import { Component, OnInit } from '@angular/core';
import FeaturedService from '../../service/FeaturedService';
import FileSystemItemHighlight from '../../model/FileSystemItemHighlight';
import { Router } from '@angular/router';

@Component({
  selector: 'app-featured-book',
  templateUrl: './featured-book.component.html',
  styleUrl: './featured-book.component.css',
})
export class FeaturedBookComponent implements OnInit {
  fileSystemItemHighlight?: FileSystemItemHighlight;

  constructor(
    private featuredService: FeaturedService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.featuredService.retrieveHighlight().subscribe({
      next: (fileSystemItemHighlight) => {
        this.fileSystemItemHighlight = fileSystemItemHighlight;
      },
      error: () => {},
    });
  }

  goToItem() {
    this.router.navigate([`/file-info/${this.fileSystemItemHighlight!.id}`]);
  }

  calculateImageUrl() {
    if (this.fileSystemItemHighlight?.imageUrl) {
      return this.fileSystemItemHighlight.imageUrl;
    }
    return '/assets/images/no-cover.jpg';
  }
}
