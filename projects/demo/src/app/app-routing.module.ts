import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogPageComponent } from './components/dialog-page/dialog-page.component';

const routes: Routes = [
  { path: 'dialog', component: DialogPageComponent },
  { path: '**', redirectTo: 'dialog' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
