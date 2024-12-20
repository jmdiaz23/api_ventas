import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Category } from "../models/Category";
import { Product } from "../models/Product";
import { CartItem } from "../models/CartItem"; 
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Category, Product, CartItem],
});
