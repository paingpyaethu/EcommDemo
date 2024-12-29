import { z } from "zod";

export const loginFormSchema = z.object({
	email: z.string().email().min(2, {
		message: 'Email must be at least 2 characters.',
	}),
	password: z.string().min(8, {
		message: 'Password must be at least 8 characters.',
	}),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export const signupFormSchema = z.object({
	name: z.string().min(3, {
		message: 'Name must be at least 3 characters.',
	}),
	email: z.string().email().min(2, {
		message: 'Email must be at least 2 characters.',
	}),
	password: z.string().min(8, {
		message: 'Password must be at least 8 characters.',
	}),
});

export type SignupFormValues = z.infer<typeof signupFormSchema>;

