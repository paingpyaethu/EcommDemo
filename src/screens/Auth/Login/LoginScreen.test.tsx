import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {LoginScreen} from '@/screens';
import {useNavigation} from '@react-navigation/native';
import {useLoginMutation} from '@/store/features/auth/authApi';
import {showToast} from '@/utils/toastConfig';

// Mock necessary modules
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));
jest.mock('react-native-device-info', () => ({
  isTablet: jest.fn(() => false),
}));
jest.mock('@/store/features/auth/authApi', () => ({
  useLoginMutation: jest.fn(),
}));
jest.mock('@/utils/toastConfig', () => ({
  showToast: jest.fn(),
}));
jest.mock('@react-navigation/elements', () => ({
  ...jest.requireActual('@react-navigation/elements'),
  useHeaderHeight: jest.fn(() => 56),
}));

describe('LoginScreen', () => {
  const mockNavigation = {
    replace: jest.fn(),
    reset: jest.fn(),
  };
  const mockLoginMutation = jest.fn();

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
    (useLoginMutation as jest.Mock).mockReturnValue([
      mockLoginMutation,
      {isLoading: false},
    ]);
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText} = render(<LoginScreen />);
    expect(getByText('Login to your account')).toBeTruthy();
    expect(getByText("It's great to see you again")).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
  });

  it('navigates to Signup Screen when "Create one" is pressed', () => {
    const {getByText} = render(<LoginScreen />);
    const createAccountLink = getByText('Create one');
    fireEvent.press(createAccountLink);
    expect(mockNavigation.replace).toHaveBeenCalledWith('Signup');
  });

  it('submits the form and navigate to home screen on successful login', async () => {
    const mockLoginMutation = jest.fn().mockResolvedValueOnce({
      success: true,
    });
    (useLoginMutation as jest.Mock).mockReturnValue([
      mockLoginMutation,
      {isLoading: false},
    ]);

    const {getByTestId} = render(<LoginScreen />);
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const loginButton = getByTestId('loginButton');

    fireEvent.changeText(emailInput, 'ppt@gmail.com');
    fireEvent.changeText(passwordInput, 'password');
    fireEvent.press(loginButton);

    await waitFor(() =>
      expect(mockLoginMutation).toHaveBeenCalledWith({
        email: 'ppt@gmail.com',
        password: 'password',
      }),
    );
  });

  it('shows error toast on failed login', async () => {
    const mockLoginMutation = jest.fn().mockResolvedValueOnce({
      success: false,
    });
    (useLoginMutation as jest.Mock).mockReturnValue([
      mockLoginMutation,
      {isLoading: false},
    ]);
    const {getByTestId} = render(<LoginScreen />);
    const emailInput = getByTestId('email');
    const passwordInput = getByTestId('password');
    const loginButton = getByTestId('loginButton');

    fireEvent.changeText(emailInput, 'wrong@example.com');
    fireEvent.changeText(passwordInput, 'wrongpassword');
    fireEvent.press(loginButton);

    await waitFor(() =>
      expect(mockLoginMutation).toHaveBeenCalledWith({
        email: 'wrong@example.com',
        password: 'wrongpassword',
      }),
    );
    expect(showToast).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Something went wrong!',
      topOffset: 56,
    });
  });
});
