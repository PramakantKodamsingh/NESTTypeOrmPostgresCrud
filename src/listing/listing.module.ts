import { Module } from '@nestjs/common';
import { ListingService } from './listing.service';
import { ListingController } from './listing.controller';
import { Listing } from './entities/listing.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Listing])],
  controllers: [ListingController],
  providers: [ListingService],
  exports:[TypeOrmModule]
})
export class ListingModule {}
