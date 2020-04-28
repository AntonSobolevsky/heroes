import { Resolver, Query, Args, Mutation, ID, Int } from '@nestjs/graphql';
import { GraphQLUpload, UserInputError } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';

import { Hero } from './models/hero.model';
import { HeroesService } from './heroes.service';
import { CreateHeroInput } from './inputs/create-hero.input';
import { UpdateHeroInput } from './inputs/update-hero.input';

@Resolver(of => Hero)
export class HeroesResolver {
  constructor(private heroesService: HeroesService) {}

  @Query(returns => [Hero], { nullable: true })
  async heroes(
    @Args({ name: 'page', type: () => Int, nullable: false, defaultValue: 1 }) page: number
  ) {
    return this.heroesService.findAll(page);
  }

  @Query(returns => Int)
  async heroesCount() {
    return this.heroesService.heroesCount();
  }

  @Query(returns => Int)
  async pageCount() {
    return this.heroesService.pageCount();
  }

  @Query(returns => Hero)
  async hero(@Args('id', { type: () => ID }) id: string) {
    return this.heroesService.find(id);
  }

  @Mutation(returns => Hero)
  async create(@Args('input', { type: () => CreateHeroInput }) input: CreateHeroInput) {
    return this.heroesService.create(input);
  }

  @Mutation(returns => Hero)
  async update(@Args('input', { type: () => UpdateHeroInput }) input: UpdateHeroInput) {
    return this.heroesService.update(input);
  }

  @Mutation(returns => Hero)
  async remove(@Args('id', { type: () => ID }) id: string) {
    return this.heroesService.remove(id);
  }

  @Mutation(returns => Hero)
  async uploadPicture(
    @Args('picture', { type: () => GraphQLUpload } ) picture: FileUpload,
    @Args('id', { type: () => ID }) id: string
  ) {
    const { filename, createReadStream } = picture;
    const newFilename = `${Date.now()}-${filename}`;

    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/${newFilename}`))
        .on('finish', () => resolve(this.heroesService.pushPicture(id, newFilename)))
        .on('error', () => reject(new UserInputError('Failed uploading!')))
    );
  }

  @Mutation(returns => Hero)
  async removePicture(
    @Args('heroId', { type: () => ID }) heroId: string,
    @Args('id', { type: () => ID }) id: string
  ) {
    return this.heroesService.removePicture(heroId, id);
  }
}
