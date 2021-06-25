import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreduzeceComponent } from './components/preduzece/preduzece.component';
import { ObrazovanjeComponent } from './components/obrazovanje/obrazovanje.component';
import { SektorComponent } from './components/sektor/sektor.component';
import { HomeComponent } from './components/core/home/home.component';
import { AboutComponent } from './components/core/about/about.component';
import { AuthorComponent } from './components/core/author/author.component';

const routes: Routes = [
  { path: 'obrazovanje', component: ObrazovanjeComponent },
  { path: 'preduzece', component: PreduzeceComponent },
  { path: 'sektor', component: SektorComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'author', component: AuthorComponent },
  { path:'', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
