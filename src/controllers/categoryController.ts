import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { Category } from "../models/Category";

const categoryRepository = AppDataSource.getRepository(Category);

export const getCategories = async (req: Request, res: Response) => {
    const categories = await categoryRepository.find({ relations: ["products"] });
    res.json(categories);
};

export const createCategory = async (req: Request, res: Response) => {
    const category = categoryRepository.create(req.body);
    await categoryRepository.save(category);
    res.status(201).json(category);
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    const category = await categoryRepository.findOne({ where: { id: Number(req.params.id) } });
    if (!category) {

        res.status(404).json({ message: "Categoría no encontrada" });
        return;
    }
    Object.assign(category, req.body);
    await categoryRepository.save(category);
    res.json(category);
};

export const deleteCategory = async (req: Request, res: Response) => {
    const result = await categoryRepository.delete(req.params.id);
    res.json(result);
};
