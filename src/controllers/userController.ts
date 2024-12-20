import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../database/data-source";
import { User } from "../models/User";

const userRepository = AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepository.create({ username, password: hashedPassword });
    await userRepository.save(user);

    res.status(201).json({ message: "Usuario registrado correctamente" });
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    const user = await userRepository.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
         res.status(401).json({ message: "Credenciales inválidas" });
         return;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "1h",
    });

    res.json({ token });
};
