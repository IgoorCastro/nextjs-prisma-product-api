import { z } from "zod";

export const GetProductSchema = z.object({
    id: z.coerce.number({
        invalid_type_error: "ID must be a valid number",
        required_error: "ID is required",
    }).int("Id must be an integer").positive("Id must be a positive number"), // tenta parsear e transformar em inteiro, id sempre positivo!
});