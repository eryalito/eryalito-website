import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { navbarRoute } from './navbar/navbar.route';

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: '',
      component: HomeComponent
    },
    navbarRoute
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
