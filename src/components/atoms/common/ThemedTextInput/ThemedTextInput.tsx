import * as React from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {cn} from '@/utils/twutil';
import {cva, type VariantProps} from 'class-variance-authority';
import {ThemedText} from '../..';
import {EyeOffIcon} from '@/utils/svg/icon.common';
import {useColorScheme} from 'nativewind';

const textInputVariants = cva(
  'font-Montserrat_Regular border rounded-lg md:rounded-xl p-2 md:p-4 mb-4 md:mb-8',
  {
    variants: {
      variant: {
        default:
          /* tw */ 'border-ecomm-black dark:border-white',
      },
      size: {
        default: /* tw */ 'text-sm md:text-xl h-14 md:h-20 leading-4 md:leading-6',
      },
      state: {
        default: '',
        error: /* tw */ 'border-red-500',
        success: /* tw */ 'border-green-500',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      state: 'default',
    },
  },
);

type TextInputProps = React.ComponentPropsWithoutRef<typeof TextInput> &
  VariantProps<typeof textInputVariants> & {
    isDisabled?: boolean;
    label?: string;
    isPassword?: boolean;
  };

const ThemedTextInput = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  TextInputProps
>(
  (
    {className, variant, size, state, isDisabled, label, isPassword, ...props},
    ref,
  ) => {
    const [isPasswordVisible, setPasswordVisible] = React.useState(false);
    const {colorScheme} = useColorScheme();

    return (
      <View className="space-y-2">
        {label && (
          <ThemedText variant={'grey'} weight={'medium'}>
            {label}
          </ThemedText>
        )}
        <View className="relative">
          <TextInput
            className={cn(
              isDisabled && 'opacity-50 bg-gray-200',
              textInputVariants({variant, size, state, className}),
            )}
            ref={ref}
            editable={!isDisabled}
            secureTextEntry={isPassword && !isPasswordVisible}
            autoCapitalize='none'
            autoCorrect={false}
            {...props}
          />
          {isPassword && (
            <TouchableOpacity
              className="absolute right-0 top-2"
              onPress={() => setPasswordVisible(prev => !prev)}>
              {isPasswordVisible ? (
                <EyeOffIcon {...{colorScheme}} />
              ) : (
                <EyeOffIcon {...{colorScheme}} />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  },
);
ThemedTextInput.displayName = 'ThemedTextInput';

export {ThemedTextInput, textInputVariants};
export type {TextInputProps};
