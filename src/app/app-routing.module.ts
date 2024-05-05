import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { FileInfoComponent } from './component/file-info/file-info.component';
import { InternalServerErrorComponent } from './component/internal-server-error/internal-server-error.component';
import { WorkInProgressComponent } from './component/work-in-progress/work-in-progress.component';
import { CursoredExplorerComponent } from './component/cursored-explorer/cursored-explorer.component';
import { CategoriesExplorerComponent as CursoredCategoriesExplorerComponent } from './component/cursored-categories-explorer/cursored-categories-explorer.component';
import { CursoredTagExplorerComponent } from './component/cursored-tag-explorer/cursored-tag-explorer.component';
import { CursoredCategoryFileExplorerComponent } from './component/cursored-category-file-explorer/cursored-category-file-explorer.component';
import { CursoredTagFileExplorerComponent } from './component/cursored-tag-file-explorer/cursored-tag-file-explorer.component';
import { ByFileExtensionExplorerComponent } from './component/by-file-extension-explorer/by-file-extension-explorer.component';
import { ExtensionsComponent } from './component/extensions/extensions.component';
import { CursoredSearchExplorerComponent } from './component/cursored-search-explorer/cursored-search-explorer.component';
import { FileInfoEditorComponent } from './component/file-info-editor/file-info-editor.component';
import { LoginFormComponent } from './component/login-form/login-form.component';
import { RegistrationFormComponent } from './component/registration-form/registration-form.component';
import { CursoredLanguagesExplorerComponent } from './component/cursored-languages-explorer/cursored-languages-explorer.component';
import { CursoredPublishersExplorerComponent } from './component/cursored-publishers-explorer/cursored-publishers-explorer.component';
import { CursoredLanguagesFileExplorerComponent } from './component/cursored-languages-file-explorer/cursored-languages-file-explorer.component';
import { CursoredPublishersFileExplorerComponent } from './component/cursored-publishers-file-explorer/cursored-publishers-file-explorer.component';
import { ChangePasswordFormComponent } from './component/change-password-form/change-password-form.component';
import { ControlPanelComponent } from './component/control-panel/control-panel.component';
import { PublishedDateExplorerComponent } from './component/published-date-explorer/published-date-explorer.component';
import { CursoredPublishedDateFileExplorerComponent } from './component/cursored-published-date-file-explorer/cursored-published-date-file-explorer.component';
import { ResetPasswordFormComponent } from './component/reset-password-form/reset-password-form.component';
import { PasswordResetEmailFormComponent } from './component/password-reset-email-form/password-reset-email-form.component';
import { CursoredByRatingFileExplorerComponent } from './component/cursored-by-rating-file-explorer/cursored-by-rating-file-explorer.component';
import { CursoredByFeaturedFileExplorerComponent } from './component/cursored-by-featured-file-explorer/cursored-by-featured-file-explorer.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'control-panel', component: ControlPanelComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'password/change', component: ChangePasswordFormComponent },
  { path: 'password/reset/:token', component: ResetPasswordFormComponent },
  { path: 'password/reset', component: PasswordResetEmailFormComponent },
  { path: 'register', component: RegistrationFormComponent },
  { path: 'categories', component: CursoredCategoriesExplorerComponent },
  { path: 'tags', component: CursoredTagExplorerComponent },
  { path: 'featured', component: CursoredByFeaturedFileExplorerComponent },
  { path: 'explorer', component: CursoredExplorerComponent },
  { path: 'rating', component: CursoredByRatingFileExplorerComponent },
  { path: 'search', component: CursoredSearchExplorerComponent },
  { path: 'explorer/:id', component: CursoredExplorerComponent },
  {
    path: 'explore/language/:parent',
    component: CursoredLanguagesFileExplorerComponent,
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
    path: 'file-info/edit/:fileSystemItemId',
    component: FileInfoEditorComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: 'work-in-progress', component: WorkInProgressComponent },
  { path: 'internal-server-error', component: InternalServerErrorComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
