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

@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    ExplorerComponent,
    HomeComponent,
    PageNotFoundComponent,
    BreadcrumbComponent,
    FileInfoComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, NgbModule],
  providers: [FileSystemService, BookInfoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
