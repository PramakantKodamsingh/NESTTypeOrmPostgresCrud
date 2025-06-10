// import { Inject, Injectable } from '@nestjs/common';
// import { CreateItemDto } from './dto/create-item.dto';
// import { UpdateItemDto } from './dto/update-item.dto';
// import { EntityManager, Repository } from 'typeorm';
// import { Item } from './entities/item.entity';
// import { InjectRepository } from '@nestjs/typeorm';

// @Injectable()
// export class ItemsService {
//   constructor(private readonly entityManager:EntityManager){}

//   @InjectRepository(Item)
//   private readonly itemRepository:Repository<Item>;


//   // async create(createItemDto: CreateItemDto) {
//   //   // await this.entityManager.insert('Item', createItemDto); 
//   //   // const item = this.entityManager.create('Item', createItemDto); // Create a new instance of Item
//   //   const item=new Item(createItemDto); // Create a new instance of Item using the constructor
//   //   await this.entityManager.save(item); // Save the item instance to the database
//   //   return item; // Return the saved item
//   // }
//    async create(createItemDto: CreateItemDto) {
//   const item=this.itemRepository.create(createItemDto); // Create a new instance of Item using the repository's create methoda
//   await this.itemRepository.save(item); // Save the item instance to the database
//   return item; // Return the saved item
//   }

//   findAll() {
//     const items=this.itemRepository.find();
//     return items;
//   }

//   findOne(id: number) {
//     return this.itemRepository.findOne({where:{id}});
//   }

//   update(id: number, updateItemDto: UpdateItemDto) {
//     return this.itemRepository.update(id, updateItemDto)
//       .then(() => this.itemRepository.findOne({where:{id}})); 
//   }

//   remove(id: number) {
//     return this.itemRepository.delete(id)
//   }
// }

import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { Listing } from '../listing/entities/listing.entity'; 
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsService {
  constructor(
    private readonly entityManager: EntityManager,

    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,

    @InjectRepository(Listing)
    private readonly listingRepository: Repository<Listing>,
  ) {}

  // async create(createItemDto: CreateItemDto) {
  //   const { listingId, ...itemData } = createItemDto;

  //   const listing = await this.listingRepository.findOne({ where: { id: listingId } });

  //   if (!listing) {
  //     throw new NotFoundException(`Listing with ID ${listingId} not found`);
  //   }

  //   const item = this.itemRepository.create({
  //     ...itemData,
  //     listing,
  //   });

  //   await this.itemRepository.save(item);
  //   return item;
  // }
  async create(createItemDto: CreateItemDto) {
  const { listingId, ...itemData } = createItemDto;

  const listing = await this.listingRepository.findOne({ where: { id: listingId } });
  if (!listing) {
    throw new NotFoundException(`Listing with ID ${listingId} not found`);
  }

  // Ensure this listing isn't already linked to another item
  const existingItem = await this.itemRepository.findOne({ where: { listing: { id: listingId } } });
  if (existingItem) {
    throw new ConflictException(`Listing with ID ${listingId} is already associated with an item`);
  }

  const item = this.itemRepository.create({
    ...itemData,
    listing,
  });

  return await this.itemRepository.save(item);
}

  findAll() {
    return this.itemRepository.find({ relations: ['listing'] }); // optional: load listing with item
  }

  findOne(id: number) {
    return this.itemRepository.findOne({
      where: { id },
      relations: ['listing'], // optional
    });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const { listingId, ...rest } = updateItemDto as any;

    const item = await this.itemRepository.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Item not found');

    if (listingId !== undefined) {
      const listing = await this.listingRepository.findOne({ where: { id: listingId } });
      if (!listing) throw new NotFoundException(`Listing with ID ${listingId} not found`);
      item.listing = listing;
    }

    Object.assign(item, rest);

    await this.itemRepository.save(item);
    return item;
  }

  remove(id: number) {
    return this.itemRepository.delete(id);
  }
}
