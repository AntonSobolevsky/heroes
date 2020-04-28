import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { pageCountQuery } from '../queries/page-count.query';
import { heroesCountQuery } from '../queries/hero-count.query';
import { heroListQuery } from '../queries/hero-list.query';
import { heroQuery } from '../queries/hero.query';

import { createMutation } from '../mutations/create.mutation';
import { deleteMutation } from '../mutations/delete.mutation';
import { updateMutation } from '../mutations/update.mutation';
import { removeImageMutation } from '../mutations/remove-image.mutation';
import { IHero } from '../interfaces/hero.interface';

@Injectable()
export class HeroGraphqlService {

  constructor(private apollo: Apollo) {}

  getPageCount(): Observable<number> {
    return this.apollo
      .query({ query: pageCountQuery.query })
      .pipe(
        map((response: ApolloQueryResult<{ [key: string]: number }>) => {
          return response.data[pageCountQuery.field];
        })
      );
  }

  getHeroCount(): Observable<number> {
    return this.apollo
      .query({ query: heroesCountQuery.query })
      .pipe(
        map((response: ApolloQueryResult<{ [key: string]: number }>) => {
          return response.data[heroesCountQuery.field];
        })
      );
  }

  getHeroList(page: number = 1): Observable<IHero[]> {
    return this.apollo
      .query({ query: heroListQuery.query, variables: { page } })
      .pipe(
        map((response: ApolloQueryResult<any>) => {
          return response.data[heroListQuery.field];
        })
      );
  }

  getHero(id: string): Observable<IHero> {
    return this.apollo
      .query({ query: heroQuery.query, variables: { id } })
      .pipe(
        map((response: ApolloQueryResult<any>) => {
          return response.data[heroQuery.field];
        })
      );
  }

  createHero(nickname: string): Observable<IHero> {
    return this.apollo
      .mutate({ mutation: createMutation.mutation, variables: { input: { nickname } } })
      .pipe(
        map((response: ApolloQueryResult<any>) => {
          return response.data[createMutation.field];
        })
      );
  }

  deleteHero(id: string): Observable<IHero> {
    return this.apollo
      .mutate({ mutation: deleteMutation.mutation, variables: { id } })
      .pipe(
        map((response: ApolloQueryResult<any>) => {
          return response.data[deleteMutation.field];
        })
      );
  }

  updateHero(data: any): Observable<IHero> {
    return this.apollo
      .mutate({ mutation: updateMutation.mutation, variables: { input: data } })
      .pipe(
        map((response: ApolloQueryResult<any>) => {
          return response.data[updateMutation.field];
        })
      );
  }

  removeImage(heroId: string, id: string): Observable<IHero> {
    return this.apollo
      .mutate({ mutation: removeImageMutation.mutation, variables: { heroId, id } })
      .pipe(
        map((response: ApolloQueryResult<any>) => {
          return response.data[removeImageMutation.field];
        })
      );
  }
}
