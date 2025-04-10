import { NextApiRequest, NextApiResponse } from "next";
import { ProductService } from "../services/product.service";
import { CreateProductSchema } from "../dto/createProduct.dto";
import { ZodError } from "zod";
import { GetProductSchema } from "../dto/getProduct.dto";

const service = new ProductService();

function handlerZodError(res: NextApiResponse, err: ZodError, status: number = 400, message: string = 'Invalid data') {
    return res.status(status).json({
        message: message,
        errors: err.flatten(),
    });
}

export async function createProduct(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            const parsed = CreateProductSchema.safeParse(req.body); // parse para um objeto valido e tipado
            if (!parsed.success) return res.status(400).json({
                message: "Invalid Data",
                errors: parsed.error.flatten(),
            });
            const product = await service.createProduct(parsed.data);
            return res.status(201).json(product);
        }
    } catch (err) {
        if (err instanceof ZodError) handlerZodError(res, err);
        return res.status(500).json({
            message: 'Unexpected error',
            error: err,
        });
    }
}

export async function getProduct(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            const parsedId = GetProductSchema.safeParse(req.query); // tenta parsear o id com o schema do zod            
            // if (!parsedId.success) return handlerZodError(res, parsedId.error, 404, `Product not found\nProduct parsedId: ${parsedId}\n\n`);
            if (parsedId.success) {
                const id = parsedId.data?.id;
                const product = await service.getById(id);
                return res.status(200).json(product);
            }
            console.log('GET ALL!!');
            const products = await service.getAll();
            return res.status(200).json(products);
        }
    } catch (err) {
        if (err instanceof ZodError) handlerZodError(res, err);
        return res.status(500).json({
            message: 'Unexpected error',
            error: err,
        });
    }
}

export async function updateProduct(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'PUT') {
            const parsedId = GetProductSchema.safeParse(req.query);
            if (!req.query || !parsedId.data?.id) return res.status(400).json({ message: "Id required" }); // nenhum id recebido
            if (!parsedId) return res.status(400).json({ message: "Invalid product ID" }); // o id recebido não é valido ou id menor que zero
            const id = parsedId.data?.id;
            const updated = await service.updateProduct(id, req.body);
            return res.status(200).json(updated);
        }
    } catch (err) {
        if (err instanceof ZodError) handlerZodError(res, err);
        return res.status(500).json({
            message: 'Unexpected error',
            error: err,
        });
    }
}

export async function deleteProduct(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'DELETE') {
            const parsedId = GetProductSchema.safeParse(req.query);
            console.log("> server: ", parsedId);
            if (!parsedId) return res.status(400).json({ message: "Id required" });
            const deleted = await service.deleteById(Number(parsedId));
            return res.status(200).json(deleted);
        }
        return res.status(405).json({ message: "Method not accepted" })
    } catch (err) {
        if (err instanceof ZodError) handlerZodError(res, err);
        return res.status(500).json({
            message: 'Unexpected error',
            error: err,
        });
    }
}