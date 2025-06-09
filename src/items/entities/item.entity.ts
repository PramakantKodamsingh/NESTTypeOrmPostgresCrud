import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({default:true})
    public:boolean;

    constructor(item?:Partial<Item>) {  // Use Partial<Item> to allow partial updates matching the properties of Item without requiring all properties to be present.
        Object.assign(this, item); //It copies all the matching properties from the passed object into the current Item instance.
    }
}
