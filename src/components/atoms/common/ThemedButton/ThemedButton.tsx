import * as React from 'react';
import { Pressable } from 'react-native';
import { cn } from '@/utils/twutil';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
	'items-center justify-center rounded-md md:rounded-xl w-full',
	{
		variants: {
			variant: {
				default: /* tw */ 'bg-ecomm-primary',
			},
			size: {
				default: /* tw */ 'px-5 py-4 md:py-7',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

type ThemedButtonProps = React.ComponentPropsWithoutRef<typeof Pressable> &
	VariantProps<typeof buttonVariants>;

const ThemedButton = React.forwardRef<
	React.ElementRef<typeof Pressable>,
	ThemedButtonProps
>(({ className, variant, size, ...props }, ref) => {
	return (
		<Pressable
			className={cn(
				props.disabled && 'opacity-50',
				buttonVariants({ variant, size, className }),
			)}
			ref={ref}
			role="button"
			{...props}
		/>
	);
});
ThemedButton.displayName = 'ThemedButton';

export { ThemedButton, buttonVariants };
export type { ThemedButtonProps };
