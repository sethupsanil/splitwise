import { GroupDetailsComponent } from './group-details/group-details.component';
import { GroupListComponent } from './group-list/group-list.component';
import { LayoutComponent } from './layout/layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {
        path: '', component: GroupListComponent
      },
      {
        path: 'details/:id', component: GroupDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
