// api = controller
import { NextApiRequest, NextApiResponse } from "next";
import { createProduct, deleteProduct, getProduct, updateProduct } from "@/modules/product/controllers/product.controller";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') return createProduct(req, res);

        if (req.method === 'GET') return getProduct(req, res);

        if (req.method === 'PUT') return updateProduct(req, res);

        if (req.method === 'DELETE') return deleteProduct(req, res);

        return res.status(405).json({ message: "Method not accepted" })
    } catch (err) {
        console.log('> Server error: ', err)
    }
}