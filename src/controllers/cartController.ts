import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { CartItem } from "../models/CartItem";
import { Product } from "../models/Product";

const cartRepository = AppDataSource.getRepository(CartItem);
const productRepository = AppDataSource.getRepository(Product);

export const getCartItems = async (req: Request, res: Response) => {
    const cartItems = await cartRepository.find({ relations: ["product"] });
    res.json(cartItems);
};

export const addCartItem = async (req: Request, res: Response): Promise<void> => {
    const { productId, quantity } = req.body;

    const product = await productRepository.findOne({ where: { id: productId } });
    if (!product) {
        res.status(404).json({ message: "Producto no encontrado" });
        return;
    }

    const cartItem = cartRepository.create({ product, quantity });
    await cartRepository.save(cartItem);

    res.status(201).json(cartItem);
};


export const updateCartItem = async (req: Request, res: Response): Promise<void> => {
    const cartItem = await cartRepository.findOne({
        where: { id: Number(req.params.id) },
        relations: ["product"],
    });

    if (!cartItem)  {
        res.status(404).json({ message: "Item del carrito no encontrado" });
        return;
    }

    const { quantity } = req.body;

    cartItem.quantity = quantity;
    await cartRepository.save(cartItem);

     res.json(cartItem); // Aquí regresas explícitamente el resultado
};


export const deleteCartItem = async (req: Request, res: Response) => {
    const result = await cartRepository.delete(req.params.id);
    res.json(result);
};
