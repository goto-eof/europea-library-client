import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home-page/home/home.component';
import { PageNotFoundComponent } from './component/common/page-not-found/page-not-found.component';
import { InternalServerErrorComponent } from './component/common/internal-server-error/internal-server-error.component';
import { WorkInProgressComponent } from './component/common/work-in-progress/work-in-progress.component';
import { ControlPanelComponent } from './component/control-panel/control-panel/control-panel.component';
import { StripeCustomerInformationEditorComponent } from './component/control-panel/stripe-customer-information-editor/stripe-customer-information-editor.component';
import { ByFileExtensionExplorerComponent } from './component/explorer/by-file-extension-explorer/by-file-extension-explorer.component';
import { CursoredByDownloadCountFileExplorerComponent } from './component/explorer/cursored-by-download-count-file-explorer/cursored-by-download-count-file-explorer.component';
import { CursoredByFeaturedFileExplorerComponent } from './component/explorer/cursored-by-featured-file-explorer/cursored-by-featured-file-explorer.component';
import { CursoredByJustAddedFileExplorerComponent } from './component/explorer/cursored-by-just-added-file-explorer/cursored-by-just-added-file-explorer.component';
import { CursoredByRatingFileExplorerComponent } from './component/explorer/cursored-by-rating-file-explorer/cursored-by-rating-file-explorer.component';
import { CursoredCategoryFileExplorerComponent } from './component/explorer/cursored-category-file-explorer/cursored-category-file-explorer.component';
import { CursoredExplorerComponent } from './component/explorer/cursored-explorer/cursored-explorer.component';
import { CursoredLanguagesExplorerComponent } from './component/explorer/cursored-languages-explorer/cursored-languages-explorer.component';
import { CursoredLanguagesFileExplorerComponent } from './component/explorer/cursored-languages-file-explorer/cursored-languages-file-explorer.component';
import { CursoredPublishedDateFileExplorerComponent } from './component/explorer/cursored-published-date-file-explorer/cursored-published-date-file-explorer.component';
import { CursoredPublishersExplorerComponent } from './component/explorer/cursored-publishers-explorer/cursored-publishers-explorer.component';
import { CursoredPublishersFileExplorerComponent } from './component/explorer/cursored-publishers-file-explorer/cursored-publishers-file-explorer.component';
import { CursoredSearchExplorerComponent } from './component/explorer/cursored-search-explorer/cursored-search-explorer.component';
import { CursoredTagExplorerComponent } from './component/explorer/cursored-tag-explorer/cursored-tag-explorer.component';
import { CursoredTagFileExplorerComponent } from './component/explorer/cursored-tag-file-explorer/cursored-tag-file-explorer.component';
import { ExtensionsComponent } from './component/explorer/extensions/extensions.component';
import { FileInfoEditorComponent } from './component/explorer/file-info-editor/file-info-editor.component';
import { FileInfoComponent } from './component/explorer/file-info/file-info.component';
import { PublishedDateExplorerComponent } from './component/explorer/published-date-explorer/published-date-explorer.component';
import { CheckoutComponent } from './component/sales/checkout/checkout.component';
import { PurchasesComponent } from './component/sales/purchases/purchases.component';
import { ChangePasswordFormComponent } from './component/security/change-password-form/change-password-form.component';
import { LoginFormComponent } from './component/security/login-form/login-form.component';
import { PasswordResetEmailFormComponent } from './component/security/password-reset-email-form/password-reset-email-form.component';
import { RegistrationFormComponent } from './component/security/registration-form/registration-form.component';
import { ResetPasswordFormComponent } from './component/security/reset-password-form/reset-password-form.component';
import { CustomHomePageComponent } from './component/home-page/custom-home-page/custom-home-page.component';
import { CategoriesExplorerComponent } from './component/explorer/cursored-categories-explorer/cursored-categories-explorer.component';
import { CompletePayerInformationComponent } from './component/sales/complete-payer-information/complete-payer-information.component';
import { CpUserManagerComponent } from './component/control-panel/cp-user-manager/cp-user-manager.component';
import { CursoredBySoldCountFileExplorerComponent } from './component/explorer/cursored-by-sold-count-file-explorer/cursored-by-sold-count-file-explorer.component';

const routes: Routes = [
  { path: 'home', component: CustomHomePageComponent },
  { path: 'about', component: HomeComponent },
  { path: 'control-panel', component: ControlPanelComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'password/change', component: ChangePasswordFormComponent },
  { path: 'password/reset/:token', component: ResetPasswordFormComponent },
  { path: 'password/reset', component: PasswordResetEmailFormComponent },
  { path: 'register', component: RegistrationFormComponent },
  { path: 'categories', component: CategoriesExplorerComponent },
  { path: 'tags', component: CursoredTagExplorerComponent },
  { path: 'featured', component: CursoredByFeaturedFileExplorerComponent },
  { path: 'explorer', component: CursoredExplorerComponent },
  { path: 'rating', component: CursoredByRatingFileExplorerComponent },
  { path: 'search', component: CursoredSearchExplorerComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'explorer/:id', component: CursoredExplorerComponent },
  {
    path: 'customer/edit',
    component: StripeCustomerInformationEditorComponent,
  },
  {
    path: 'customer/purchases',
    component: PurchasesComponent,
  },
  {
    path: 'explore/language/:parent',
    component: CursoredLanguagesFileExplorerComponent,
  },
  {
    path: 'explore/downloadCount',
    component: CursoredByDownloadCountFileExplorerComponent,
  },
  {
    path: 'explore/salesCount',
    component: CursoredBySoldCountFileExplorerComponent,
  },
  {
    path: 'explore/justAdded',
    component: CursoredByJustAddedFileExplorerComponent,
  },
  {
    path: 'explore/publisher/:parent',
    component: CursoredPublishersFileExplorerComponent,
  },
  {
    path: 'explore/published-date/:parent',
    component: CursoredPublishedDateFileExplorerComponent,
  },
  { path: 'extension', component: ExtensionsComponent },
  { path: 'language', component: CursoredLanguagesExplorerComponent },
  { path: 'publisher', component: CursoredPublishersExplorerComponent },
  { path: 'published-date', component: PublishedDateExplorerComponent },
  {
    path: 'explore/extension/:extension',
    component: ByFileExtensionExplorerComponent,
  },
  {
    path: 'explorer/category/:id',
    component: CursoredCategoryFileExplorerComponent,
  },
  { path: 'explorer/tag/:id', component: CursoredTagFileExplorerComponent },
  { path: 'file-info/:fileSystemItemId', component: FileInfoComponent },
  {
    path: 'file-info/fileMetaInfoId/:fileMetaInfoId',
    component: FileInfoComponent,
  },
  {
    path: 'file-info/edit/:fileSystemItemId',
    component: FileInfoEditorComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: 'explore/user', component: CpUserManagerComponent },
  { path: 'work-in-progress', component: WorkInProgressComponent },
  { path: 'internal-server-error', component: InternalServerErrorComponent },
  {
    path: 'complete-payee-information',
    component: CompletePayerInformationComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
