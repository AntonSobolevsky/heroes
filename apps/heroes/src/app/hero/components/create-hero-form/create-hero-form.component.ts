import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-create-hero-form',
  templateUrl: './create-hero-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateHeroFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private heroService: HeroService,
    public dialogRef: MatDialogRef<CreateHeroFormComponent>
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      nickname: new FormControl('', [ Validators.required ])
    });
  }

  createHero(event: Event) {
    event.preventDefault();
    const name = this.form.value.nickname;

    this.heroService.createHero(name)
      .subscribe(() => {
        this.form.get('nickname').patchValue('');
        this.form.reset();
        this.dialogRef.close(true);
      });
  }
}
