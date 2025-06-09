import { Inject, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsService {
  constructor(private readonly entityManager:EntityManager){}

  @InjectRepository(Item)
  private readonly itemRepository:Repository<Item>;


  // async create(createItemDto: CreateItemDto) {
  //   // await this.entityManager.insert('Item', createItemDto); 
  //   // const item = this.entityManager.create('Item', createItemDto); // Create a new instance of Item
  //   const item=new Item(createItemDto); // Create a new instance of Item using the constructor
  //   await this.entityManager.save(item); // Save the item instance to the database
  //   return item; // Return the saved item
  // }
   async create(createItemDto: CreateItemDto) {
  const item=this.itemRepository.create(createItemDto); // Create a new instance of Item using the repository's create methoda
  await this.itemRepository.save(item); // Save the item instance to the database
  return item; // Return the saved item
  }

  findAll() {
    const items=this.itemRepository.find();
    return items;
  }

  findOne(id: number) {
    return this.itemRepository.findOne({where:{id}});
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return this.itemRepository.update(id, updateItemDto)
      .then(() => this.itemRepository.findOne({where:{id}})); 
  }

  remove(id: number) {
    return this.itemRepository.delete(id)
  }
}
