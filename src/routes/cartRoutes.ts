import { Router } from "express";
import {
    getCartItems,
    addCartItem,
    updateCartItem,
    deleteCartItem,
} from "../controllers/cartController";

const router = Router();

router.get("/", getCartItems);
router.post("/", addCartItem);
router.put("/:id", updateCartItem);
router.delete("/:id", deleteCartItem);

export default router;
