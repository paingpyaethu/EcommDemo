import React from 'react';
import {View} from 'react-native';
import {ThemedButton, ThemedText} from '@/components/atoms';
import {ThemedTextInput} from '@/components/molecules';
import {SafeScreen, KeyboardAvoidingLayout} from '@/components/template';
import {useNavigation} from '@react-navigation/native';
import {AuthStackNavigationProp} from '@/types/navigation/root';
import {FormProvider, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {SignupFormValues, signupFormSchema} from '@/types/schemas/auth';

const SignupScreen = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignupFormValues) => {
    console.log('Signup Data:', data);
  };

  return (
    <FormProvider {...form}>
      <SafeScreen>
        <KeyboardAvoidingLayout>
          <View className="flex-1 justify-center m-6 md:m-10">
            <View className="mb-4 md:mb-8">
              <ThemedText size={'xl_24'} weight={'bold'}>
                Create an account
              </ThemedText>
              <ThemedText variant={'lightGrey'}>
                Let's create your account
              </ThemedText>
            </View>

            <ThemedTextInput label="Name" name="name" />
            <ThemedTextInput
              label="Email"
              name="email"
              keyboardType="email-address"
            />
            <ThemedTextInput label="Password" name="password" isPassword />

            <ThemedButton
              className="mt-10"
              onPress={form.handleSubmit(onSubmit)}>
              <ThemedText variant={'button'}>Create an Account</ThemedText>
            </ThemedButton>

            <ThemedText className="mt-4 md:mt-8 text-center">
              Already have an account?{' '}
              <ThemedText
                className="underline"
                onPress={() => navigation.replace('Login')}>
                Log In
              </ThemedText>
            </ThemedText>
          </View>
        </KeyboardAvoidingLayout>
      </SafeScreen>
    </FormProvider>
  );
};

export default SignupScreen;
