import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, SvgProps} from 'react-native-svg';

type TabProp = {
  focused: boolean;
  colorScheme: 'dark' | 'light';
};

const color = [
  {
    dark: '#8F5F43', // focused
    light: '#8F5F43',
  },
  {
    dark: '#9299A3',
    light: '#9299A3',
  },
];

export const HomeTabIcon = ({
  focused,
  colorScheme,
  ...props
}: TabProp & SvgProps) => (
  <Svg
    className="w-16 h-16 md:w-24 md:h-24"
    fill="none"
    viewBox="-19.2 -19.2 62.4 62.4"
    {...props}>
    <G
      stroke={focused ? color[0][colorScheme] : color[1][colorScheme]}
      strokeLinecap="round"
      strokeWidth={1.5}>
      <Path d="M22 12.204v1.521c0 3.9 0 5.851-1.172 7.063C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.212C2 19.576 2 17.626 2 13.725v-1.521c0-2.289 0-3.433.52-4.381.518-.949 1.467-1.537 3.364-2.715l2-1.241C9.889 2.622 10.892 2 12 2c1.108 0 2.11.622 4.116 1.867l2 1.241c1.897 1.178 2.846 1.766 3.365 2.715M15 18H9" />
    </G>
  </Svg>
);

export const FavouriteTabIcon = ({
  focused,
  colorScheme,
  ...props
}: TabProp & SvgProps) => (
  <Svg
    className="w-16 h-16 md:w-24 md:h-24"
    fill="none"
    viewBox="-19.2 -19.2 62.4 62.4"
    {...props}>
    <Path
      fill={focused ? color[0][colorScheme] : color[1][colorScheme]}
      d="m8.962 18.91.464-.588-.464.589ZM12 5.5l-.54.52.01.011.53-.53Zm3.038 13.41.465.59-.465-.59ZM13.47 8.03a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9.426 18.322C7.91 17.127 6.253 15.96 4.938 14.48 3.65 13.028 2.75 11.334 2.75 9.137h-1.5c0 2.666 1.11 4.7 2.567 6.339 1.43 1.61 3.254 2.9 4.68 4.024l.93-1.178ZM2.75 9.137c0-2.15 1.215-3.954 2.874-4.713 1.612-.737 3.778-.541 5.836 1.597l1.08-1.04C10.1 2.444 7.264 2.025 5 3.06 2.786 4.073 1.25 6.425 1.25 9.137h1.5ZM8.497 19.5c.513.404 1.063.834 1.62 1.16.557.325 1.193.59 1.883.59v-1.5c-.31 0-.674-.12-1.126-.385-.453-.264-.922-.628-1.448-1.043L8.497 19.5Zm7.006 0c1.426-1.125 3.25-2.413 4.68-4.024 1.457-1.64 2.567-3.673 2.567-6.339h-1.5c0 2.197-.9 3.891-2.188 5.343-1.315 1.48-2.972 2.647-4.488 3.842l.929 1.178ZM22.75 9.137c0-2.712-1.535-5.064-3.75-6.077-2.264-1.035-5.098-.616-7.54 1.92l1.08 1.04c2.058-2.137 4.224-2.333 5.836-1.596 1.659.759 2.874 2.562 2.874 4.713h1.5Zm-8.176 9.185c-.526.415-.995.779-1.448 1.043-.452.264-.816.385-1.126.385v1.5c.69 0 1.326-.265 1.883-.59.558-.326 1.107-.756 1.62-1.16l-.929-1.178ZM11.47 6.032l2 1.998 1.06-1.06-2-2-1.06 1.061Z"
    />
  </Svg>
);