import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column("text")
    description: string;

    @Column()
    information: string;

    @Column("decimal", { precision: 10, scale: 2 })
    price: number;

    @Column("decimal", { precision: 5, scale: 2 })
    iva: number;

    @Column()
    imageUrl: string;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;
}
