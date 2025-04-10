import z from 'zod';

export const UpdateProductSchema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    price: z.number().positive("Price must be greater than zero").optional(),
    description: z.string().min(1, "Name is required").optional()
}).refine(data => Object.keys(data).length > 0, { // verifica se ao menos um campo foi preenchido
    message: "At least one field must be provide"
});

export type UpdateProductDto = z.infer<typeof UpdateProductSchema>;

// export class UpdateProductDto {
//     name?: string;
//     price?: number;
//     description?: string;

//     constructor(data: UpdateProductDto) {
//         Object.assign(this, data);
//     }
// }