import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home-page/home/home.component';
import { PageNotFoundComponent } from './component/common/page-not-found/page-not-found.component';
import { BreadcrumbComponent } from './component/common/breadcrumb/breadcrumb.component';
import { FileInfoComponent } from './component/explorer/file-info/file-info.component';
import { FileInfoEditorComponent } from './component/explorer/file-info-editor/file-info-editor.component';
import { FooterComponent } from './component/common/footer/footer.component';
import { WorkInProgressComponent } from './component/common/work-in-progress/work-in-progress.component';
import { InternalServerErrorComponent } from './component/common/internal-server-error/internal-server-error.component';
import { RatingComponent } from './component/common/rating/rating.component';
import { CursoredExplorerComponent } from './component/explorer/cursored-explorer/cursored-explorer.component';
import { CursoredTagExplorerComponent } from './component/explorer/cursored-tag-explorer/cursored-tag-explorer.component';
import { CursoredTagFileExplorerComponent } from './component/explorer/cursored-tag-file-explorer/cursored-tag-file-explorer.component';
import { CursoredCategoryFileExplorerComponent } from './component/explorer/cursored-category-file-explorer/cursored-category-file-explorer.component';
import { ByFileExtensionExplorerComponent } from './component/explorer/by-file-extension-explorer/by-file-extension-explorer.component';
import { ExtensionsComponent } from './component/explorer/extensions/extensions.component';
import { BytesToMegabytesPipe } from './pipe/bytes-to-megabytes.pipe';
import { SearchFormComponent } from './component/common/search-form/search-form.component';
import { CursoredSearchExplorerComponent } from './component/explorer/cursored-search-explorer/cursored-search-explorer.component';
import { BookCardComponent } from './component/sales/book-card/book-card.component';
import { PurchasesComponent } from './component/sales/purchases/purchases.component';
import { CheckoutComponent } from './component/sales/checkout/checkout.component';
import { StripeCustomerInformationEditorComponent } from './component/control-panel/stripe-customer-information-editor/stripe-customer-information-editor.component';
import { CpSecurityComponent } from './component/control-panel/cp-security/cp-security.component';
import { FeaturedBookComponent } from './component/home-page/featured-book/featured-book.component';
import { PopularDownloadsContainerComponent } from './component/home-page/popular-downloads-container/popular-downloads-container.component';
import { PopularDownloadsComponent } from './component/home-page/popular-downloads/popular-downloads.component';
import { LatestBooksComponent } from './component/home-page/latest-books/latest-books.component';
import { CursoredByJustAddedFileExplorerComponent } from './component/explorer/cursored-by-just-added-file-explorer/cursored-by-just-added-file-explorer.component';
import { NavBarComponent } from './component/common/nav-bar/nav-bar.component';
import { FeaturedBooksComponent } from './component/home-page/featured-books/featured-books.component';
import { CustomHomePageComponent } from './component/home-page/custom-home-page/custom-home-page.component';
import { CpHomePageEditorComponent } from './component/control-panel/cp-home-page-editor/cp-home-page-editor.component';
import { CursoredByDownloadCountFileExplorerComponent } from './component/explorer/cursored-by-download-count-file-explorer/cursored-by-download-count-file-explorer.component';
import { CursoredByFeaturedFileExplorerComponent } from './component/explorer/cursored-by-featured-file-explorer/cursored-by-featured-file-explorer.component';
import { CursoredByRatingFileExplorerComponent } from './component/explorer/cursored-by-rating-file-explorer/cursored-by-rating-file-explorer.component';
import { PasswordResetEmailFormComponent } from './component/security/password-reset-email-form/password-reset-email-form.component';
import { ResetPasswordFormComponent } from './component/security/reset-password-form/reset-password-form.component';
import { PublishedDateExplorerComponent } from './component/explorer/published-date-explorer/published-date-explorer.component';
import { EntityButtonComponent } from './component/explorer/entity-button/entity-button.component';
import { CursoredPublishedDateFileExplorerComponent } from './component/explorer/cursored-published-date-file-explorer/cursored-published-date-file-explorer.component';
import { ControlPanelComponent } from './component/control-panel/control-panel/control-panel.component';
import { ChangePasswordFormComponent } from './component/security/change-password-form/change-password-form.component';
import { CursoredPublishersFileExplorerComponent } from './component/explorer/cursored-publishers-file-explorer/cursored-publishers-file-explorer.component';
import { CursoredLanguagesFileExplorerComponent } from './component/explorer/cursored-languages-file-explorer/cursored-languages-file-explorer.component';
import { CursoredPublishersExplorerComponent } from './component/explorer/cursored-publishers-explorer/cursored-publishers-explorer.component';
import { CursoredLanguagesExplorerComponent } from './component/explorer/cursored-languages-explorer/cursored-languages-explorer.component';
import { RegistrationFormComponent } from './component/security/registration-form/registration-form.component';
import { LoginFormComponent } from './component/security/login-form/login-form.component';

import { AppRoutingModule } from './app-routing.module';
import FileSystemService from './service/FileSystemService';
import CursoredFileSystemService from './service/CursoredFileSystemService';
import BookInfoService from './service/BookInfoService';
import CursoredCategoriesService from './service/CursoredCategoriesService';
import CursoredTagService from './service/CursoredTagService';
import AuthService from './service/AuthService';
import SnackBarService from './service/SnackBarService';
import QRCodeService from './service/QRCodeService';
import PublisherService from './service/PublisherService';
import LanguageService from './service/LanguageService';
import JobService from './service/JobService';
import PublishedDateService from './service/PublishedDateService';
import CacheLoaderService from './service/CacheLoaderService';
import FeaturedService from './service/FeaturedService';
import RequestInterceptor from './interceptor/RequestInterceptor';
import { StripePurchasesService } from './service/StripePurchasesService';
import PaymentService from './service/PaymentService';
import CustomerService from './service/CustomerService';
import FileMetaInfoService from './service/FileMetaInfoService';
import ApplicationSettingsService from './service/ApplicationSettingsService';
import PostService from './service/PostService';
import { CategoriesExplorerComponent } from './component/explorer/cursored-categories-explorer/cursored-categories-explorer.component';
import { ExplorerComponent } from './component/explorer/explorer/explorer.component';
import { ControlPanelLargeComponent } from './component/control-panel/control-panel-large/control-panel-large.component';
import { ControlPanelSmallComponent } from './component/control-panel/control-panel-small/control-panel-small.component';
import { CpAdministrationComponent } from './component/control-panel/cp-administration/cp-administration.component';
import { CpProfileComponent } from './component/control-panel/cp-profile/cp-profile.component';
import { CpAccountComponent } from './component/control-panel/cp-account/cp-account.component';
import { CompletePayerInformationComponent } from './component/sales/complete-payer-information/complete-payer-information.component';
import UserManagerService from './service/UserManagerService';
import { CpUserManagerComponent } from './component/control-panel/cp-user-manager/cp-user-manager.component';
import { UserCardComponent } from './component/control-panel/cp-user-manager/user-card/user-card.component';

@NgModule({
  declarations: [
    CategoriesExplorerComponent,
    AppComponent,
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
    CursoredCategoryFileExplorerComponent,
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
    CursoredByFeaturedFileExplorerComponent,
    CursoredByDownloadCountFileExplorerComponent,
    CpHomePageEditorComponent,
    CustomHomePageComponent,
    FeaturedBooksComponent,
    NavBarComponent,
    CursoredByJustAddedFileExplorerComponent,
    LatestBooksComponent,
    PopularDownloadsComponent,
    PopularDownloadsContainerComponent,
    FeaturedBookComponent,
    CpSecurityComponent,
    StripeCustomerInformationEditorComponent,
    CheckoutComponent,
    PurchasesComponent,
    BookCardComponent,
    ControlPanelLargeComponent,
    ControlPanelSmallComponent,
    CpAdministrationComponent,
    CpProfileComponent,
    CpAccountComponent,
    CompletePayerInformationComponent,
    CpUserManagerComponent,
    UserCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    FileSystemService,
    CursoredFileSystemService,
    BookInfoService,
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
    FeaturedService,
    PostService,
    ApplicationSettingsService,
    FileMetaInfoService,
    CustomerService,
    PaymentService,
    StripePurchasesService,
    UserManagerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
