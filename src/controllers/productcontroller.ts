import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Product } from "../models/Product";
import { Category } from "../models/Category";

const productRepository = AppDataSource.getRepository(Product);
const categoryRepository = AppDataSource.getRepository(Category);

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    const products = await productRepository.find({ relations: ["category"] });
    res.json(products);
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    const product = await productRepository.findOne({
        where: { id: Number(req.params.id) },
        relations: ["category"],
    });

    if (!product) {
        res.status(404).json({ message: "Producto no encontrado" });
        return;
    }

    res.json(product);
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    const { name, description, information, price, iva, categoryId, imageUrl  } = req.body;

    const category = await categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) {
        res.status(404).json({ message: "Categoría no encontrada" });
        return;
    }

    const product = productRepository.create({
        name,
        description,
        information,
        price,
        iva,
        imageUrl,
        category,
    });

    await productRepository.save(product);
    res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    const product = await productRepository.findOne({
        where: { id: Number(req.params.id) },
        relations: ["category"],
    });

    if (!product) {
        res.status(404).json({ message: "Producto no encontrado" });
        return;
    }

    const { name, description, information, price, iva, categoryId,imageUrl  } = req.body;

    if (categoryId) {
        const category = await categoryRepository.findOne({ where: { id: categoryId } });
        if (!category) {
            res.status(404).json({ message: "Categoría no encontrada" });
            return;
        }

        product.category = category;
    }

    Object.assign(product, { name, description, information, price, iva,imageUrl  });

    await productRepository.save(product);
    res.json(product);
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const result = await productRepository.delete(req.params.id);
    res.json(result);
};
