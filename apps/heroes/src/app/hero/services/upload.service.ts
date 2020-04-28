import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { IHeroImage } from '../interfaces/hero-image.interface';

@Injectable()
export class UploadService {

  uri = `http://localhost:3333/graphql`;

  constructor(private http: HttpClient) {}

  uploadImage(formData): Observable<{images: IHeroImage}> {
    return this.http.post(this.uri, formData).pipe(
      map((res: any) => {
        return res.data.uploadPicture
      })
    )
  }
}
