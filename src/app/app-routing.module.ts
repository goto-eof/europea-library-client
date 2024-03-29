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

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'categories', component: CursoredCategoriesExplorerComponent },
  { path: 'tags', component: CursoredTagExplorerComponent },
  { path: 'explorer', component: CursoredExplorerComponent },
  { path: 'explorer/:id', component: CursoredExplorerComponent },
  {
    path: 'explorer/category/:id',
    component: CursoredCategoryFileExplorerComponent,
  },
  { path: 'explorer/tag/:id', component: CursoredTagFileExplorerComponent },
  { path: 'file-info/:fileSystemItemId', component: FileInfoComponent },
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
