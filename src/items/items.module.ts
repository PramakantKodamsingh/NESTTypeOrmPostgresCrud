import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ListingModule } from 'src/listing/listing.module';

@Module({
  imports: [TypeOrmModule.forFeature([Item]),ListingModule], 
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
