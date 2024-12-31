import { z } from "zod";

export const profileFormSchema = z.object({
  email: z.string().email().min(2, {
		message: 'Email must be at least 2 characters.',
	}),
	name: z.string().min(3, {
		message: 'Name must be at least 3 characters.',
	}),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
