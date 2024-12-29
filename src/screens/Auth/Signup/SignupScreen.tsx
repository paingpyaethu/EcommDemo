import React from 'react';
import {ActivityIndicator, Alert, View} from 'react-native';
import {ThemedButton, ThemedText} from '@/components/atoms';
import {ThemedTextInput} from '@/components/molecules';
import {SafeScreen, KeyboardAvoidingLayout} from '@/components/template';
import {useNavigation} from '@react-navigation/native';
import {AuthStackNavigationProp} from '@/types/navigation/root';
import {FormProvider, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {SignupFormValues, signupFormSchema} from '@/types/schemas/auth';
import {useRegisterMutation} from '@/store/features/auth/authApi';
import {isTablet} from 'react-native-device-info';
import { showToast } from '@/utils/toastConfig';
import { useHeaderHeight } from '@react-navigation/elements';

const SignupScreen = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const headerHeight = useHeaderHeight();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const [registerMutation, {isLoading}] = useRegisterMutation();

  const onSubmit = async (values: SignupFormValues) => {
    try {
      const payload = await registerMutation({
        name: values.name,
        email: values.email,
        password: values.password,
      }).unwrap();
      if (payload.success) {
        Alert.alert('Great!', 'Successfully registered!', [
          {
            text: 'OK',
            onPress: () => navigation.replace('Login'),
          },
        ]);
      }
    } catch (error: any) {
      showToast({
        type: 'error',
        text1: error.data.message ?? 'Registration failed. Please try again.',
        topOffset: headerHeight
      })
    }
  };

  return (
    <FormProvider {...form}>
      <SafeScreen>
        <KeyboardAvoidingLayout>
          <View className="flex-1 justify-center m-6 md:m-10">
            <View className="mb-4 md:mb-8 gap-1">
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
              {isLoading ? (
                <ActivityIndicator
                  color={'#fff'}
                  size={isTablet() ? 'large' : 'small'}
                />
              ) : (
                <ThemedText variant={'button'}>Create an Account</ThemedText>
              )}
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
