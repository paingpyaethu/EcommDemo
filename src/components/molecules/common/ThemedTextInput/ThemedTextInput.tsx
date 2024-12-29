import * as React from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import {cn} from '@/utils/twutil';
import {cva, type VariantProps} from 'class-variance-authority';
import { ThemedText } from '@/components/atoms';
import {EyeOffIcon} from '@/utils/svg/icon.common';
import {useColorScheme} from 'nativewind';
import {useController, useFormContext} from 'react-hook-form';

const textInputVariants = cva(
  'font-Montserrat_Regular border rounded-lg md:rounded-xl p-2 md:p-4',
  {
    variants: {
      variant: {
        default: /* tw */ 'border-ecomm-black dark:border-white',
      },
      size: {
        default:
          /* tw */ 'text-sm md:text-xl text-ecomm-text-black dark:text-white  h-14 md:h-20 leading-4 md:leading-6',
      },
      state: {
        default: '',
        error: /* tw */ 'border-ecomm-text-error dark:border-ecomm-text-error-dark',
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
    name: string;
  };

const ThemedTextInput = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  TextInputProps
>(
  (
    {
      className,
      variant,
      size,
      state,
      isDisabled,
      label,
      isPassword,
      name,
      ...props
    },
    ref,
  ) => {
    const {control} = useFormContext();
    const {
      field: {onChange, onBlur, value},
      fieldState: {error},
    } = useController({name, control});

    const [isPasswordVisible, setPasswordVisible] = React.useState(false);
    const {colorScheme} = useColorScheme();

    return (
      <View className='space-y-2'>
        {label && (
          <ThemedText variant={'grey'} weight={'medium'}>
            {label}
          </ThemedText>
        )}
        <View className="relative mb-4 md:mb-8">
          <TextInput
            className={cn(
              isDisabled && 'opacity-50 bg-gray-200',
              textInputVariants({
                variant,
                size,
                state: error ? 'error' : state,
                className,
              }),
            )}
            ref={ref}
            editable={!isDisabled}
            secureTextEntry={isPassword && !isPasswordVisible}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            autoCapitalize="none"
            autoCorrect={false}
            {...props}
          />
          {error && (
            <ThemedText size={'xs_12'} variant={'error'} className='mt-1'>
              {error.message}
            </ThemedText>
          )}

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
