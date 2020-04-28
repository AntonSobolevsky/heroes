import { RouterModule, Route } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Route[] = [
  {
    path: 'heroes',
    loadChildren: () => import('./hero/hero.module').then(m => m.HeroModule)
  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouterModule {}
