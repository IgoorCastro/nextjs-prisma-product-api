import { prisma } from "@/infra/prismaclient";
import { CreateProductDto } from "../dto/createProduct.dto";
import { UpdateProductDto } from "../dto/updateProduct.dto";
import { Product } from "../entity/product.entity";

export class ProductRepository {
    async create(data: CreateProductDto) {
        const product = new Product(data);
        return prisma.product.create({ data: product.prismaCreate() });
    }

    async listAll() {
        return prisma.product.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
            }
        });
    }

    async getById(id: number) { // procura por um igual ao nome da chave 'id'        
        return prisma.product.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
            }
        })
    }

    async deleteProduct(id: number) { // procura por um igual ao nome da chave 'id' para deletar
        return prisma.product.delete({
            where: { id }
        })
    }

    async updateProduct(id: number, data: UpdateProductDto) {
        const product = new Product(data);
        return prisma.product.update({
            where: { id },
            data: product.prismaUpdate(),
        });
    }
}