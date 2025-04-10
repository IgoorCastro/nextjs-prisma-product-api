// contem as regras de negócio para acessar o repositório (arquivo responsavel por acessar o Db)

import { CreateProductDto } from "../dto/createProduct.dto";
import { UpdateProductDto } from "../dto/updateProduct.dto";
import { ProductRepository } from "../repositories/product.repository";

export class ProductService { //classe que acessa os metodos de acesso de repositorio
    private useRepository = new ProductRepository();

    async createProduct(data: CreateProductDto) {
        return this.useRepository.create(data);
    }

    async updateProduct(id: number, data: UpdateProductDto) {
        return this.useRepository.updateProduct(id, data);
    }

    async getAll() {
        return this.useRepository.listAll();
    }

    async getById(id: number) {
        return this.useRepository.getById(id)
    }

    async deleteById(id: number) {
        return this.useRepository.deleteProduct(id);
    }
}