import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

import { HeroService } from '../../services/hero.service';
import { CreateHeroFormComponent } from '../create-hero-form/create-hero-form.component';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroListComponent implements OnInit {

  heroList$: Observable<any>;
  heroCount$: Observable<number>;

  loading = true;
  page = 1;

  displayedColumns: string[] = ['image', 'nickname', 'actions'];

  constructor(
    private heroService: HeroService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.heroList$ = this.heroService.getHeroList();
    this.heroCount$ = this.heroService.getHeroCount();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateHeroFormComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.heroList$ = this.heroService.getHeroList();
        this.heroCount$ = this.heroService.getHeroCount();
        this.cd.markForCheck();
      }
    });
  }

  changePage(data: {pageIndex: number}) {
    this.heroList$ = this.heroService.getHeroList(data.pageIndex + 1);
    this.cd.markForCheck();
  }

  deleteHero(hero: any) {
    this.heroService.deleteHero(hero._id).subscribe((res) => {
      console.log(res);
      if (res) {
        this.heroList$ = this.heroService.getHeroList();
        this.heroCount$ = this.heroService.getHeroCount();
        this.cd.markForCheck();
        console.log(this.heroList$);
      }
    })
  }

  editHero(hero: any) {
    this.router.navigate([hero._id], { relativeTo: this.route });
  }
}
