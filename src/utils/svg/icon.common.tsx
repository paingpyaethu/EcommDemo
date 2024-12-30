import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, SvgProps} from 'react-native-svg';

type ColorSchemeType = {
  colorScheme: 'dark' | 'light';
};

export const EyeOffIcon = ({
  colorScheme,
  ...props
}: ColorSchemeType & SvgProps) => (
  <Svg
    className="w-10 h-10 md:w-[75px] md:h-[75px]"
    fill="none"
    viewBox="-12 -12 48 48"
    {...props}>
    <G
      stroke={colorScheme === 'light' ? '#4b5563' : '#9ca3af'}
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

export const EyeIcon = ({
  colorScheme,
  ...props
}: ColorSchemeType & SvgProps) => (
  <Svg
    className="w-10 h-10 md:w-[75px] md:h-[75px]"
    fill="none"
    viewBox="-12 -12 48 48"
    {...props}>
    <G
      stroke={colorScheme === 'light' ? '#4b5563' : '#9ca3af'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}>
      <Path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <Path d="M12.001 5C7.524 5 3.733 7.943 2.46 12c1.274 4.057 5.065 7 9.542 7 4.478 0 8.268-2.943 9.542-7-1.274-4.057-5.064-7-9.542-7Z" />
    </G>
  </Svg>
);

export const FavouriteIcon = ({
  colorScheme,
  ...props
}: ColorSchemeType & SvgProps) => (
  <Svg
    fill={props.fill}
    className="w-5 h-5 md:w-10 md:h-10"
    viewBox="0 0 24 24"
    {...props}>
    <Path
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.7 4C18.87 4 21 6.98 21 9.76 21 15.39 12.16 20 12 20c-.16 0-9-4.61-9-10.24C3 6.98 5.13 4 8.3 4c1.82 0 3.01.91 3.7 1.71.69-.8 1.88-1.71 3.7-1.71Z"
    />
  </Svg>
);

export const EmptyIcon = ({
  colorScheme,
  ...props
}: ColorSchemeType & SvgProps) => (
  <Svg className="w-28 h-28 md:w-44 md:h-44" viewBox="0 0 50 50" {...props}>
    <Path d="M7.813 8A1 1 0 0 0 7 9v4c0 .55.45 1 1 1h.188l2.937 15.75c-.02.207.023.414.125.594l1.344 7.187a.971.971 0 0 0 .094.469l.718 3.875v.031C13.898 44.234 15.922 46 18.312 46h13.375c2.383 0 4.516-1.738 4.907-4.125v-.031L37.312 38v-.031l.032-.063c.047-.129.07-.27.062-.406l1.344-7.125a.99.99 0 0 0 .125-.656L41.813 14H42c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1H7.813ZM9 10h32v2h-8.781a.936.936 0 0 0-.313-.031.88.88 0 0 0-.093.031H21.218a.936.936 0 0 0-.313-.031.88.88 0 0 0-.093.031H9Zm3.438 4h3.124L14 15.563Zm6 0h2.125l3 3-4.063 4.094L15.437 17Zm5 0h3.125L25 15.563Zm6 0h2.125l3 3-4.063 4.063L26.437 17Zm5 0h3.124L36 15.563Zm-24.094.781L12.563 17l-1.5 1.531Zm29.312 0-.687 3.75L37.437 17ZM14 18.437l4.094 4.063L14 26.594 12.406 25a.954.954 0 0 0-.156-.125l-.75-3.969Zm11 0 4.094 4.063L25 26.594 20.906 22.5Zm11 0 2.5 2.47-.719 3.937a.906.906 0 0 0-.187.156L36 26.594 31.906 22.5Zm-16.5 5.47L23.594 28 19.5 32.094 15.406 28Zm11 0L34.594 28 30.5 32.094 26.406 28Zm-16.5 5.5 4.094 4.093-3.563 3.563-1.281-6.907Zm11 0 4.094 4.093L25 37.594 20.906 33.5Zm11 0 .781.78-1.312 6.875-3.563-3.562Zm-16.5 5.5L23.594 39 20 42.594 15.906 38.5Zm11 0 3.594 3.593L30 42.594 26.406 39Zm-5.5 5.5L28.594 44h-7.188Zm-9.781.218L18.594 44h-.282c-1.41 0-2.628-1.027-2.937-2.5Zm19.562 0-.156.875v.031C34.402 42.93 33.098 44 31.687 44h-.28Z" />
  </Svg>
);

export const ContrastIcon = ({
  colorScheme,
  ...props
}: ColorSchemeType & SvgProps) => (
  <Svg
    fill="none"
    className="w-6 h-6 md:w-12 md:h-12"
    viewBox="0 0 24 24"
    {...props}
  >
    <G
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <Path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
      <Path d="M16 8.5a7.5 7.5 0 0 1-9.284 7.287 6.5 6.5 0 1 0 9.07-9.07c.14.571.214 1.168.214 1.783Z" />
    </G>
  </Svg>
);
