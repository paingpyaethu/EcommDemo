import * as React from 'react';
import {Text} from 'react-native';
import {cn} from '@/utils/twutil';
import {cva, type VariantProps} from 'class-variance-authority';

const textVariants = cva('text-sm', {
  variants: {
    variant: {
      default: /* tw */ 'text-ecomm-text-black dark:text-white',
      primary: /* tw */ 'text-ecomm-primary dark:text-ecomm-primary-dark',
      lightGrey: /* tw */ 'text-ecomm-grey',
			grey: /* tw */ 'text-gray-700 dark:text-gray-300',
			button: /* tw */ 'text-white'
    },
    size: {
      default: /* tw */ 'text-sm md:text-2xl',
      xs_12: /* tw */ 'text-xs',
      md_16: /* tw */ 'text-base',
      lg_18: /* tw */ 'text-lg',
      xl_20: /* tw */ 'text-xl md:text-3xl',
      xl_24: /* tw */ 'text-2xl md:text-4xl',
    },
    weight: {
      default: /* tw */ 'font-Montserrat_Regular',
      bold: /* tw */ 'font-Montserrat_Bold',
      semibold: /* tw */ 'font-Montserrat_SemiBold',
      medium: /* tw */ 'font-Montserrat_Medium',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    weight: 'default',
  },
});

type TextProps = React.ComponentPropsWithoutRef<typeof Text> &
  VariantProps<typeof textVariants>;

const ThemedText = React.forwardRef<React.ElementRef<typeof Text>, TextProps>(
  ({className, variant, size, weight, children, ...props}, ref) => {
    return (
      <Text
        className={cn(
          props.disabled && 'opacity-50',
          textVariants({variant, size, weight, className}),
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

export {ThemedText, textVariants};
export type {TextProps};
