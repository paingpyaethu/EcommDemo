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
    title: 'Welcome to EcommDemo',
    description: 'Explore a wide range of products at unbeatable prices.',
    image: require('@/assets/images/onboard/img-1.png'), // Replace with your image path
  },
  {
    id: '2',
    title: 'Exclusive Deals',
    description: 'Get access to exclusive deals and discounts just for you.',
    image: require('@/assets/images/onboard/img-2.png'), // Replace with your image path
  },
  {
    id: '3',
    title: 'Fast & Secure Checkout',
    description: 'Enjoy a seamless and secure shopping experience.',
    image: require('@/assets/images/onboard/img-3.png'), // Replace with your image path
  },
];

export const productCarouselData = [
  {key: 1, image: require('@/assets/images/product/img-1.png')},
  {key: 2, image: require('@/assets/images/product/img-2.png')},
  {key: 3, image: require('@/assets/images/product/img-3.png')},
];

export const categoryData = [
  {id: 1, name: 'Fashion'},
  {id: 2, name: 'Electronics'},
  {id: 3, name: 'Health & Beauty'},
  {id: 4, name: 'Sports'},
  {id: 5, name: 'Books'},
  {id: 6, name: 'Stationery'},
]

export const colorData = [
  {id: 1, name: 'black', bgColor: '#000000'},
  {id: 2, name: 'pink', bgColor: '#F0A8D0'},
  {id: 3, name: 'purple', bgColor: '#87A2FF'},
  {id: 4, name: 'white', bgColor: '#ffffff'},
  {id: 5, name: 'red', bgColor: '#D21312'},
  {id: 6, name: 'green', bgColor: '#03C988'},
]

export const sizeData = [
  {id: 1, name: 'XS'},
  {id: 2, name: 'S'},
  {id: 3, name: 'M'},
  {id: 4, name: 'L'},
  {id: 5, name: 'XL'},
  {id: 6, name: 'XXL'},
]