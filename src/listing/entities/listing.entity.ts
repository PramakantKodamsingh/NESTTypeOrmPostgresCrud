import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Listing {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    constructor(listing?: Partial<Listing>) {
        Object.assign(this, listing);
    }
}
