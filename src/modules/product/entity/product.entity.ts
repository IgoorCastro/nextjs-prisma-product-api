export class Product {
    public readonly id?: number; // id e createdAt sera carregado no db
    public readonly createdAt?: Date;
    public name?: string;
    public price?: number;
    public description?: string;

    constructor(props: Partial<{
        id: number;
        createdAt: Date;
        name: string;
        price: number;
        description: string;
    }>) {
        const { name, price, description, id, createdAt } = props;

        // Regras de negócio:
        if (price !== undefined && price <= 0) throw new Error("Price must be greater than zero"); // valor do produto deve ser positivo
        if (name !== undefined && name.trim().length === 0) throw new Error("Product name is required"); // validar o campo nome

        this.name = name;
        this.price = price;
        this.description = description;
        this.id = id;
        this.createdAt = createdAt;
    }

    prismaCreate() {
        // Garantir que todos os campos estão presentes
        if (!this.name || !this.price || !this.description) throw new Error("All fields are required for creation");
        return {
            // metodo para definir os campos a ser utilizado no db
            name: this.name,
            price: this.price,
            description: this.description,
        }
    }

    prismaUpdate() {
        const data: {name?: string, price?: number, description?: string} = {};
        if(this.name !== undefined) data.name = this.name;
        if(this.price !== undefined) data.price = this.price;
        if(this.description !== undefined) data.description = this.description;
        return data;
    }
}