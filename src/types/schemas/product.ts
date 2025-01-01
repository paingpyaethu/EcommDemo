import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Enter a valid price'),
  categoryId: z.string().min(1, 'Category is required'),
  colors: z.array(z.number()).min(1, 'Select at least one color'),
  sizes: z.array(z.number()).min(1, 'Select at least one size'),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
