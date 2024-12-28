import * as React from 'react';
import { Text } from 'react-native';
import { cn } from '@/utils/twutil';
import { cva, type VariantProps } from 'class-variance-authority';

const textVariants = cva(
	'font-Montserrat_Regular text-sm',
	{
		variants: {
			variant: {
				default: /* tw */ 'text-ecomm-black dark:text-white',
				primary: /* tw */ 'text-ecomm-primary dark:text-ecomm-primary-dark',
				grey: /* tw */ 'text-ecomm-grey dark:text-ecomm-primary-dark',
			},
			size: {
				default: /* tw */ 'text-sm md:text-2xl',
				xs_12: /* tw */ 'text-xs',
				md_16: /* tw */ 'text-base',
				lg_18: /* tw */ 'text-lg',
				xl_20: /* tw */ 'text-xl md:text-3xl',
				xl_24: /* tw */ 'text-2xl',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

type TextProps = React.ComponentPropsWithoutRef<typeof Text> &
	VariantProps<typeof textVariants>;

const ThemedText = React.forwardRef<React.ElementRef<typeof Text>, TextProps>(
	({ className, variant, size, children, ...props }, ref) => {
		return (
			<Text
				className={cn(
					props.disabled && 'opacity-50',
					textVariants({ variant, size, className }),
				)}
				ref={ref}
				children={children}
				suppressHighlighting
				{...props}
			/>
		);
	},
);
ThemedText.displayName = 'ThemedText';

export { ThemedText, textVariants };
export type { TextProps };
