import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ExplorerComponent } from './component/explorer/explorer.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { FileInfoComponent } from './component/file-info/file-info.component';
import { InternalServerErrorComponent } from './component/internal-server-error/internal-server-error.component';
import { WorkInProgressComponent } from './component/work-in-progress/work-in-progress.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'explorer', component: ExplorerComponent },
  { path: 'explorer/:id', component: ExplorerComponent },
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
