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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    MatCardModule,
  ],
  providers: [
    FileSystemService,
    CursoredFileSystemService,
    BookInfoService,
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
