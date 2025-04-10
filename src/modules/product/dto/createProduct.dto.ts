import z from 'zod';

export const CreateProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    price: z.number().positive("Price must be greater than zero"),
    description: z.string().min(1, "Description is required")
});

export type CreateProductDto = z.infer<typeof CreateProductSchema>;

// export class CreateProductDto {
//     name!: string;
//     price!: number;
//     description!: string;

//     constructor(data: CreateProductDto) {
//         Object.assign(this, data);
//     }
// }