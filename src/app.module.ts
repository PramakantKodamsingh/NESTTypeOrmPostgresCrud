import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ItemsModule } from './items/items.module';
import { ListingModule } from './listing/listing.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),DatabaseModule, ItemsModule, ListingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
