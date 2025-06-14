import { Listing } from "src/listing/entities/listing.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({default:true})
    public:boolean;

    @OneToOne(() => Listing)
    @JoinColumn({name:'ListId'}) // 👈 Foreign key (listingId) will be in Item table
    listing: Listing;

    constructor(item?:Partial<Item>) {  // Use Partial<Item> to allow partial updates matching the properties of Item without requiring all properties to be present.
        Object.assign(this, item); //It copies all the matching properties from the passed object into the current Item instance.
    }
}
