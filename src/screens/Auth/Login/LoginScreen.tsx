import React from 'react';
import {View} from 'react-native';
import {ThemedButton, ThemedText} from '@/components/atoms';
import {SafeScreen, KeyboardAvoidingLayout} from '@/components/template';
import {useNavigation} from '@react-navigation/native';
import {AuthStackNavigationProp} from '@/types/navigation/root';
import {FormProvider, useForm} from 'react-hook-form';
import { LoginFormValues, loginFormSchema } from '@/types/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { ThemedTextInput } from '@/components/molecules';

const LoginScreen = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log('Login Data:', data);
  };
  return (
    <FormProvider {...form}>
      <SafeScreen>
        <KeyboardAvoidingLayout>
          <View className="flex-1 justify-center m-6 md:m-10">
            <View className="mb-4 md:mb-8">
              <ThemedText size={'xl_24'} weight={'bold'}>
                Login to your account
              </ThemedText>
              <ThemedText variant={'lightGrey'}>
                It's great to see you again
              </ThemedText>
            </View>

            <ThemedTextInput
              label="Email"
              name="email"
              keyboardType="email-address"
            />
            <ThemedTextInput label="Password" name="password" isPassword />

            <ThemedButton
              className="mt-10"
              onPress={form.handleSubmit(onSubmit)}>
              <ThemedText variant={'button'}>Login</ThemedText>
            </ThemedButton>

            <ThemedText className="mt-4 md:mt-8 text-center">
              Don't have an account?{' '}
              <ThemedText
                className="underline"
                onPress={() => navigation.replace('Signup')}>
                Join
              </ThemedText>
            </ThemedText>
          </View>
        </KeyboardAvoidingLayout>
      </SafeScreen>
    </FormProvider>
  );
};

export default LoginScreen;
