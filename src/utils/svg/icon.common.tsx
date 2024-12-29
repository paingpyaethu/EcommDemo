import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, SvgProps} from 'react-native-svg';

type ColorSchemeType = {
	colorScheme: 'dark' | 'light';
};

export const EyeOffIcon = ({
	colorScheme,
	...props
}: ColorSchemeType & SvgProps) => (
  <Svg className='w-10 h-10 md:w-16 md:h-16' fill='none' viewBox="-12 -12 48 48" {...props}>
    <G
      stroke={colorScheme === 'light' ? "#4b5563" : '#9ca3af'}
      strokeLinecap="round"
      strokeWidth={2.5}
      clipPath="url(#a)">
      <Path
        strokeLinejoin="round"
        d="M10.73 5.073A10.96 10.96 0 0 1 12 5c4.664 0 8.4 2.903 10 7a11.595 11.595 0 0 1-1.555 2.788M6.52 6.519C4.48 7.764 2.9 9.693 2 12c1.6 4.097 5.336 7 10 7a10.44 10.44 0 0 0 5.48-1.52M9.88 9.88a3 3 0 1 0 4.243 4.243"
      />
      <Path d="m4 4 16 16" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);