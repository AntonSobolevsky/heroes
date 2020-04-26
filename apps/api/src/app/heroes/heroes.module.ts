import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { HeroesResolver } from './heroes.resolver';
import { HeroSchema } from './schemas/hero.schema';
import { HeroesService } from './heroes.service';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: 'Hero', schema: HeroSchema },
    ])
  ],
  providers: [HeroesResolver, HeroesService]
})
export class HeroesModule {}
