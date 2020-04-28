import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

import { HeroRouterModule } from './hero.router';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { CreateHeroFormComponent } from './components/create-hero-form/create-hero-form.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';

import { HeroService } from './services/hero.service';
import { HeroGraphqlService } from './services/hero-graphql.service';
import { UploadService } from './services/upload.service';

@NgModule({
  imports: [
    CommonModule,
    HeroRouterModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule
  ],
  declarations: [
    HeroListComponent,
    CreateHeroFormComponent,
    HeroDetailComponent
  ],
  providers: [HeroService, HeroGraphqlService, UploadService],
  entryComponents: [CreateHeroFormComponent]
})
export class HeroModule {}
