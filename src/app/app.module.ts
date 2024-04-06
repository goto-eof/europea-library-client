import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigatorComponent } from './component/navigator/navigator.component';
import { ExplorerComponent } from './component/explorer/explorer.component';
import { HomeComponent } from './component/home/home.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import FileSystemService from './service/FileSystemService';
import { HttpClientModule } from '@angular/common/http';
import { BreadcrumbComponent } from './component/breadcrumb/breadcrumb.component';
import { FileInfoComponent } from './component/file-info/file-info.component';
import BookInfoService from './service/BookInfoService';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './component/footer/footer.component';
import { WorkInProgressComponent } from './component/work-in-progress/work-in-progress.component';
import { InternalServerErrorComponent } from './component/internal-server-error/internal-server-error.component';
import { RatingComponent } from './component/rating/rating.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCardModule } from '@angular/material/card';
import { CursoredExplorerComponent } from './component/cursored-explorer/cursored-explorer.component';
import CursoredFileSystemService from './service/CursoredFileSystemService';
import { CategoriesExplorerComponent as CursoredCategoriesExplorerComponent } from './component/cursored-categories-explorer/cursored-categories-explorer.component';
import { MatChipsModule } from '@angular/material/chips';
import CursoredCategoriesService from './service/CursoredCategoriesService';
import CursoredTagService from './service/CursoredTagService';
import { CursoredTagFileExplorerComponent } from './component/cursored-tag-file-explorer/cursored-tag-file-explorer.component';
import { CursoredCategoryFileExplorerComponent } from './component/cursored-category-file-explorer/cursored-category-file-explorer.component';
import { CursoredTagExplorerComponent } from './component/cursored-tag-explorer/cursored-tag-explorer.component';
import { ByFileExtensionExplorerComponent } from './component/by-file-extension-explorer/by-file-extension-explorer.component';
import { ExtensionsComponent } from './component/extensions/extensions.component';
import { BytesToMegabytesPipe } from './bytes-to-megabytes.pipe';
@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    ExplorerComponent,
    HomeComponent,
    PageNotFoundComponent,
    BreadcrumbComponent,
    FileInfoComponent,
    FooterComponent,
    WorkInProgressComponent,
    InternalServerErrorComponent,
    RatingComponent,
    CursoredExplorerComponent,
    CursoredCategoriesExplorerComponent,
    CursoredTagExplorerComponent,
    CursoredTagFileExplorerComponent,
    CursoredCategoryFileExplorerComponent,
    ByFileExtensionExplorerComponent,
    ExtensionsComponent,
    BytesToMegabytesPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    MatCardModule,
    MatChipsModule,
  ],
  providers: [
    FileSystemService,
    CursoredFileSystemService,
    BookInfoService,
    provideAnimationsAsync(),
    CursoredCategoriesService,
    CursoredTagService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
