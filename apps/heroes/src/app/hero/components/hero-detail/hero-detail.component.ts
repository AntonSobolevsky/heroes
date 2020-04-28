import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

import { HeroService } from '../../services/hero.service';
import { IHeroImage } from '../../interfaces/hero-image.interface';
import { IHero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailComponent implements OnInit {

  form: FormGroup;
  images: IHeroImage[];
  heroId: string;

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  files  = [];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getHero().subscribe((res) => {
      if (res) {
        this.form = this.createForm(res);
        this.images = [...res.images];
        this.cd.markForCheck();
      }
    });
  }

  updateHero(event: Event) {
    event.preventDefault();
    const { images, ...data } = this.form.value;

    this.heroService.updateHero(data).subscribe();
  }

  addSuperpowerRow() {
    (this.form.get('superpowers') as FormArray).push(new FormControl(''));
  }

  removeSuperpowerRow(i: number) {
    (this.form.get('superpowers') as FormArray).removeAt(i);
  }

  removeImage(i: number, image: IHeroImage) {
    this.heroService.removeImage(this.heroId, image._id).subscribe(() => {
      this.images.splice(i, 1);
      this.cd.markForCheck();
    });
  }

  uploadFile(file) {
    this.heroService.uploadImage(this.heroId, file.data)
      .subscribe((res: any) => {
        this.images = res.images;
        this.cd.markForCheck();
      });
  }

  onClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (let index = 0; index < fileUpload.files.length; index++) {
        const file = fileUpload.files[index];
        this.files.push({ data: file, inProgress: false, progress: 0});
      }

      this.uploadFiles();
    };

    fileUpload.click();
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach(file => {
      this.uploadFile(file);
    });
}

  private createForm(data: IHero) {
    return this.fb.group({
      _id: [data._id],
      nickname: [data.nickname || ''],
      real_name: [data.real_name || ''],
      origin_description: [data.origin_description || ''],
      superpowers: this.fb.array(data.superpowers.map(superpower => {
        return this.fb.control(superpower);
      })),
      catch_phrase: [data.catch_phrase || '']
    })
  }

  private getHero() {
    this.heroId = this.route.snapshot.params['id'];

    return this.heroService.getHero(this.heroId);
  }
}
