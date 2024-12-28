import {ImageSourcePropType} from 'react-native';

export interface IOnboardingData {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
}

export const onboardingData: IOnboardingData[] = [
  {
    id: '1',
    title: "Welcome to EcommDemo",
    description: "Explore a wide range of products at unbeatable prices.",
    image: require('@/assets/images/onboard/img-1.png'), // Replace with your image path
  },
  {
    id: '2',
    title: "Exclusive Deals",
    description: "Get access to exclusive deals and discounts just for you.",
    image: require('@/assets/images/onboard/img-2.png'), // Replace with your image path
  },
  {
    id: '3',
    title: "Fast & Secure Checkout",
    description: "Enjoy a seamless and secure shopping experience.",
    image: require('@/assets/images/onboard/img-3.png'), // Replace with your image path
  },
];
