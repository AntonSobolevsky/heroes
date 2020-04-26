
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { Hero } from './models/hero.model';
import { CreateHeroInput } from './inputs/create-hero.input';
import { IHero } from './interfaces/hero.interface';
import { UpdateHeroInput } from './inputs/update-hero.input';
import { UserInputError } from 'apollo-server-express';

@Injectable()
export class HeroesService {
  constructor(
    @InjectModel('Hero') private heroModel: Model<IHero>,
    private configService: ConfigService
  ) {}

  async create(createHeroInput: CreateHeroInput): Promise<Hero> {
    const createdHero = new this.heroModel(createHeroInput);

    return createdHero.save();
  }

  async update(updateHeroInput: UpdateHeroInput): Promise<Hero> {
    const { _id, ...updateHero } = updateHeroInput;

    return this.heroModel.findByIdAndUpdate(_id, updateHero, { new: true }).exec();
  }

  async remove(id: string): Promise<Hero | UserInputError> {
    try {
      const hero = await this.heroModel.findByIdAndRemove(id);
      return hero;
    } catch (err) {
      return new UserInputError(`This superhero doesn't exist!`);
    }
  }

  async find(id: string) {
    try {
      const hero = await this.heroModel.findById(id).exec();
      return hero;
    } catch (err) {
      return new UserInputError(`This superhero doesn't exist!`);
    }
  }

  async findAll(page: number): Promise<Hero[]> {
    const limit = parseInt(this.configService.get<string>('PAGINATION_LIMIT'), 10);

    return this.heroModel.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async heroesCount(): Promise<number> {
    return this.heroModel.find().count();
  }

  async pageCount(): Promise<number> {
    const limit = parseInt(this.configService.get<string>('PAGINATION_LIMIT'), 10);
    const count = await this.heroModel.find().countDocuments();

    return count < limit
      ? 1
      : (count % limit === 0)
        ? count / limit
        : Math.ceil(count / limit);
  }

  async pushPicture(heroId: string, filename: string): Promise<Hero> {
    const hero = await this.find(heroId);

    return hero.set('images', [ ...hero.images, { filename }]).save();
  }

  async removePicture(heroId: string, id: string): Promise<Hero> {
    return this.heroModel.findByIdAndUpdate(
      heroId,
      { $pull: { images: { _id: id }} },
      { new: true }
    )
  }

}
