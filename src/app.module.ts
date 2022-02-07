import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:uiDfmrsLmzbsDUNk@cluster0.smv0c.mongodb.net/smartranking?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,

        useUnifiedTopology: true,
      },
    ),
    PlayersModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
