import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { HeroGraphqlService } from './hero-graphql.service';
import { of, Observable } from 'rxjs';

import { UploadService } from './upload.service';
import { IHero } from '../interfaces/hero.interface';
import { IHeroImage } from '../interfaces/hero-image.interface';

@Injectable()
export class HeroService {

  constructor(
    private api: HeroGraphqlService,
    private uploadService: UploadService
  ) {}

  getPageCount(): Observable<number | null> {
    return this.api.getPageCount().pipe(
      catchError((err) => of(null))
    );
  }

  getHeroCount(): Observable<number | null> {
    return this.api.getHeroCount().pipe(
      catchError((err) => of(null))
    );
  }

  getHeroList(page?): Observable<IHero[] | null> {
    return this.api.getHeroList(page).pipe(
      catchError((err) => of(null))
    );
  }

  getHero(id: string): Observable<IHero | null> {
    return this.api.getHero(id).pipe(
      catchError((err) => of(null))
    );
  }

  createHero(nickname: string): Observable<IHero | null> {
    return this.api.createHero(nickname).pipe(
      catchError((err) => of(null))
    );
  }

  deleteHero(id: string): Observable<IHero | null> {
    return this.api.deleteHero(id).pipe(
      catchError((err) => of(null))
    );
  }

  updateHero(data: IHero): Observable<IHero | null> {
    return this.api.updateHero(data).pipe(
      catchError((err) => of(null))
    );
  }

  removeImage(heroId: string, id: string): Observable<IHero | null> {
    return this.api.removeImage(heroId, id).pipe(
      catchError((err) => of(null))
    );
  }

  uploadImage(heroId: string, file: any): Observable<{images: IHeroImage}> {
    const formData = new FormData();
    formData.append('operations', `{"query":"mutation UploadFile($id: ID!, $picture: Upload!) { uploadPicture(id: $id, picture: $picture) { images { filename, _id } }}","variables":{"id": "${heroId}"}}`);
    formData.append('map', '{"0": ["variables.picture"]}');
    formData.append('0', file);

    return this.uploadService.uploadImage(formData);
  }
}
