import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { PlayersService } from './players/players.service';
import { MongooseModule } from '@nestjs/mongoose';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
