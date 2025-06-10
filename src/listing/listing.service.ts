import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { Listing } from './entities/listing.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(Listing)
    private readonly listingRepository:Repository<Listing>) {}

  create(createListingDto: CreateListingDto) {
    return this.listingRepository.save(createListingDto);
  }

  findAll() {
    return this.listingRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} listing`;
  }

  update(id: number, updateListingDto: UpdateListingDto) {
    return `This action updates a #${id} listing`;
  }

  remove(id: number) {
    return `This action removes a #${id} listing`;
  }
}
