import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

import { HeroesModule } from './heroes/heroes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'graphql.gql'),
      uploads: {
        maxFileSize: 10000000,
        maxFiles: 5
      }
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    ),
    HeroesModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
