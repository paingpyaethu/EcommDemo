import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {ThemedButton, ThemedText} from '@/components/atoms';
import {SafeScreen, KeyboardAvoidingLayout} from '@/components/template';
import {useNavigation} from '@react-navigation/native';
import {AuthStackNavigationProp} from '@/types/navigation/root';
import {FormProvider, useForm} from 'react-hook-form';
import {LoginFormValues, loginFormSchema} from '@/types/schemas/auth';
import {zodResolver} from '@hookform/resolvers/zod';
import {ThemedTextInput} from '@/components/molecules';
import {useLoginMutation} from '@/store/features/auth/authApi';
import {isTablet} from 'react-native-device-info';
import {showToast} from '@/utils/toastConfig';
import {useHeaderHeight} from '@react-navigation/elements';

const LoginScreen = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const headerHeight = useHeaderHeight();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [loginMutation, {isLoading}] = useLoginMutation();

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const payload = await loginMutation({
        email: values.email,
        password: values.password,
      }).unwrap();
      if (payload.success) {
        showToast({
          text1: 'Login successful',
          topOffset: headerHeight,
        });
      }
    } catch (error: any) {
      showToast({
        type: 'error',
        text1: error?.data?.message ?? 'Something went wrong!',
        topOffset: headerHeight,
      });
    }
  };
  return (
    <FormProvider {...form}>
      <SafeScreen>
        <KeyboardAvoidingLayout>
          <View className="flex-1 justify-center m-6 md:m-10">
            <View className="mb-4 md:mb-8 gap-1">
              <ThemedText size={'xl_24'} weight={'bold'}>
                Login to your account
              </ThemedText>
              <ThemedText variant={'lightGrey'}>
                It's great to see you again
              </ThemedText>
            </View>

            <ThemedTextInput
              testID="email"
              label="Email"
              name="email"
              keyboardType="email-address"
            />
            <ThemedTextInput
              testID="password"
              label="Password"
              name="password"
              isPassword
            />

            <ThemedButton
              testID="loginButton"
              className="mt-10"
              onPress={form.handleSubmit(onSubmit)}>
              {isLoading ? (
                <ActivityIndicator
                  color={'#fff'}
                  size={isTablet() ? 'large' : 'small'}
                />
              ) : (
                <ThemedText variant={'button'}>Login</ThemedText>
              )}
            </ThemedButton>

            <ThemedText className="mt-4 md:mt-8 text-center">
              Don't have an account?{' '}
              <ThemedText
                className="underline"
                onPress={() => navigation.replace('Signup')}>
                Create one
              </ThemedText>
            </ThemedText>
          </View>
        </KeyboardAvoidingLayout>
      </SafeScreen>
    </FormProvider>
  );
};

export default LoginScreen;
