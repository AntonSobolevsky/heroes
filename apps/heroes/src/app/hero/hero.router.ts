import { RouterModule, Route } from '@angular/router';
import { NgModule } from '@angular/core';

import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';

const routes: Route[] = [
  {
    path: '',
    component: HeroListComponent
  },
  {
    path: ':id',
    component: HeroDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroRouterModule {}

