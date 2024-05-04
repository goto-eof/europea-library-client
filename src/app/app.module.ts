import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigatorComponent } from './component/navigator/navigator.component';
import { ExplorerComponent } from './component/explorer/explorer.component';
import { HomeComponent } from './component/home/home.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import FileSystemService from './service/FileSystemService';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { BytesToMegabytesPipe } from './pipe/bytes-to-megabytes.pipe';
import { SearchFormComponent } from './component/search-form/search-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CursoredSearchExplorerComponent } from './component/cursored-search-explorer/cursored-search-explorer.component';
import { FileInfoEditorComponent } from './component/file-info-editor/file-info-editor.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { LoginFormComponent } from './component/login-form/login-form.component';
import { RegistrationFormComponent } from './component/registration-form/registration-form.component';
import AuthService from './service/AuthService';
import RequestInterceptor from './interceptor/RequestInterceptor';
import SnackBarService from './service/SnackBarService';
import QRCodeService from './service/QRCodeService';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CursoredLanguagesExplorerComponent } from './component/cursored-languages-explorer/cursored-languages-explorer.component';
import { CursoredPublishersExplorerComponent } from './component/cursored-publishers-explorer/cursored-publishers-explorer.component';
import { CursoredLanguagesFileExplorerComponent } from './component/cursored-languages-file-explorer/cursored-languages-file-explorer.component';
import { CursoredPublishersFileExplorerComponent } from './component/cursored-publishers-file-explorer/cursored-publishers-file-explorer.component';
import PublisherService from './service/PublisherService';
import LanguageService from './service/LanguageService';
import { ChangePasswordFormComponent } from './component/change-password-form/change-password-form.component';
import { ControlPanelComponent } from './component/control-panel/control-panel.component';
import JobService from './service/JobService';
import { EntityButtonComponent } from './component/entity-button/entity-button.component';
import PublishedDateService from './service/PublishedDateService';
import { CursoredPublishedDateFileExplorerComponent } from './component/cursored-published-date-file-explorer/cursored-published-date-file-explorer.component';
import { PublishedDateExplorerComponent } from './component/published-date-explorer/published-date-explorer.component';
import CacheLoaderService from './service/CacheLoaderService';
import { ResetPasswordFormComponent } from './component/reset-password-form/reset-password-form.component';
import { PasswordResetEmailFormComponent } from './component/password-reset-email-form/password-reset-email-form.component';
import { CursoredByRatingFileExplorerComponent } from './component/cursored-by-rating-file-explorer/cursored-by-rating-file-explorer.component';
@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    ExplorerComponent,
    HomeComponent,
    PageNotFoundComponent,
    BreadcrumbComponent,
    FileInfoComponent,
    FileInfoEditorComponent,
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
    SearchFormComponent,
    CursoredSearchExplorerComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    CursoredLanguagesExplorerComponent,
    CursoredPublishersExplorerComponent,
    CursoredLanguagesFileExplorerComponent,
    CursoredPublishersFileExplorerComponent,
    ChangePasswordFormComponent,
    ControlPanelComponent,
    EntityButtonComponent,
    CursoredPublishedDateFileExplorerComponent,
    EntityButtonComponent,
    PublishedDateExplorerComponent,
    ResetPasswordFormComponent,
    PasswordResetEmailFormComponent,
    CursoredByRatingFileExplorerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    MatCardModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  providers: [
    FileSystemService,
    CursoredFileSystemService,
    BookInfoService,
    provideAnimationsAsync(),
    CursoredCategoriesService,
    CursoredTagService,
    AuthService,
    SnackBarService,
    QRCodeService,
    PublisherService,
    LanguageService,
    JobService,
    PublishedDateService,
    CacheLoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
