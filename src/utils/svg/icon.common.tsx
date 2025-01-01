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
    {...props}>
    <G
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}>
      <Path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" />
      <Path d="M16 8.5a7.5 7.5 0 0 1-9.284 7.287 6.5 6.5 0 1 0 9.07-9.07c.14.571.214 1.168.214 1.783Z" />
    </G>
  </Svg>
);

export const RatingIcon = (props: SvgProps) => (
  <Svg
    fill="none"
    className="w-3 h-3 md:w-6 md:h-6"
    viewBox="0 0 24 24"
    {...props}>
    <Path
      fill="#eab308"
      d="m12 17.328-5.403 3.286a.75.75 0 0 1-1.12-.813l1.456-6.155-4.796-4.123a.75.75 0 0 1 .428-1.316l6.303-.517 2.44-5.835a.75.75 0 0 1 1.384 0l2.44 5.835 6.303.517a.75.75 0 0 1 .427 1.316l-4.795 4.123 1.456 6.155a.75.75 0 0 1-1.12.813L12 17.328z"
    />
  </Svg>
);

export const PlusIcon = (props: SvgProps) => (
  <Svg
    fill="none"
    className="w-6 h-6 md:w-12 md:h-12"
    viewBox="0 0 32 32"
    {...props}>
    <Path
      fill={props.fill}
      fillRule="evenodd"
      d="M22 17h-5v5a1.001 1.001 0 0 1-2 0v-5h-5a1.001 1.001 0 0 1 0-2h5v-5a1.001 1.001 0 0 1 2 0v5h5a1.001 1.001 0 0 1 0 2ZM16 0C7.163 0 0 7.16 0 16s7.163 16 16 16 16-7.16 16-16S24.837 0 16 0Z"
    />
  </Svg>
);

export const MinusIcon = (props: SvgProps) => (
  <Svg
    fill="none"
    className="w-6 h-6 md:w-12 md:h-12"
    viewBox="0 0 32 32"
    {...props}>
    <Path
      fill={props.fill}
      fillRule="evenodd"
      d="M22 17H10a1.001 1.001 0 0 1 0-2h12a1.001 1.001 0 0 1 0 2ZM16 0C7.163 0 0 7.16 0 16s7.163 16 16 16 16-7.16 16-16S24.837 0 16 0Z"
    />
  </Svg>
);

export const CloseIcon = (props: SvgProps) => (
  <Svg
    fill="none"
    className="w-4 h-4 md:w-8 md:h-8"
    viewBox="0 0 32 32"
    {...props}>
    <Path
      fill={props.fill}
      fillRule="evenodd"
      d="M21.657 20.24a1.002 1.002 0 1 1-1.415 1.42l-4.236-4.24-4.266 4.27c-.394.39-1.032.39-1.426 0a1.015 1.015 0 0 1 0-1.43l4.266-4.27-4.236-4.23a1.006 1.006 0 0 1 0-1.42 1 1 0 0 1 1.414 0l4.236 4.24 4.298-4.3a1.014 1.014 0 0 1 1.425 0c.393.4.393 1.03 0 1.43l-4.297 4.3 4.237 4.23ZM16 0C7.163 0 0 7.16 0 16s7.163 16 16 16 16-7.16 16-16S24.837 0 16 0Z"
    />
  </Svg>
);

export const SaveIcon = (props: SvgProps) => (
  <Svg
    fill="none"
    className="w-12 h-12 md:w-24 md:h-24"
    viewBox="0 0 24 24"
    {...props}>
    <G fill="#8F5F43">
      <Path d="M17 20.75H7A2.75 2.75 0 0 1 4.25 18V6A2.75 2.75 0 0 1 7 3.25h7.5c.199 0 .39.08.53.22L19.53 8c.14.14.22.331.22.53V18A2.75 2.75 0 0 1 17 20.75Zm-10-16A1.25 1.25 0 0 0 5.75 6v12A1.25 1.25 0 0 0 7 19.25h10A1.25 1.25 0 0 0 18.25 18V8.81l-4.06-4.06H7Z" />
      <Path d="M16.75 20h-1.5v-6.25h-6.5V20h-1.5v-6.5a1.25 1.25 0 0 1 1.25-1.25h7a1.25 1.25 0 0 1 1.25 1.25V20ZM12.47 8.75H8.53a1.29 1.29 0 0 1-1.28-1.3V4h1.5v3.25h3.5V4h1.5v3.45a1.29 1.29 0 0 1-1.28 1.3Z" />
    </G>
  </Svg>
);

export const AddToCartIcon = (props: SvgProps) => (
  <Svg
    fill="none"
    className="w-6 h-6 md:w-12 md:h-12"
    viewBox="0 0 24 24"
    {...props}>
    <G stroke={props.stroke || '#047857'} strokeWidth={1.5}>
      <Path d="M7.5 18a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM16.5 18a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
      <Path
        strokeLinecap="round"
        d="M13 13v-2m0 0V9m0 2h2m-2 0h-2M2 3l.261.092c1.302.457 1.953.686 2.325 1.231.372.545.372 1.268.372 2.715V9.76c0 2.942.063 3.912.93 4.826.866.914 2.26.914 5.05.914H12m4.24 0c1.561 0 2.342 0 2.894-.45.551-.45.709-1.214 1.024-2.743l.5-2.424c.347-1.74.52-2.609.076-3.186-.443-.577-1.96-.577-3.645-.577h-6.065m-6.066 0H7"
      />
    </G>
  </Svg>
);

export const CheckoutIcon = (props: SvgProps) => (
  <Svg
    fill="none"
    className="w-6 h-6 md:w-12 md:h-12"
    viewBox="0 0 24 24"
    {...props}>
    <G fill="#FFFFFF">
      <Path d="M21.25 22H2.75c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h18.5c.41 0 .75.34.75.75s-.34.75-.75.75Z" />
      <Path
        d="m20.59 13.7-7.23 7.23a3.618 3.618 0 0 1-5.12.01l-4.61-4.61L15.99 3.97l4.61 4.61a3.618 3.618 0 0 1-.01 5.12Z"
        opacity={0.4}
      />
      <Path d="M15.99 3.97 3.62 16.33l-.91-.91a3.618 3.618 0 0 1 .01-5.12l7.23-7.23a3.618 3.618 0 0 1 5.12-.01l.92.91ZM12.89 17.6l-1.35 1.35c-.28.28-.73.28-1.01 0a.712.712 0 0 1 0-1.01l1.35-1.35c.28-.28.73-.28 1.01 0s.28.73 0 1.01ZM17.27 13.22l-2.69 2.69c-.28.28-.73.28-1.01 0a.712.712 0 0 1 0-1.01l2.69-2.69c.28-.28.73-.28 1.01 0 .27.28.27.73 0 1.01Z" />
    </G>
  </Svg>
);

export const TrashIcon = (props: SvgProps) => (
  <Svg
    fill="none"
    className="w-5 h-5 md:w-10 md:h-10"
    viewBox="0 0 24 24"
    {...props}>
    <G
      stroke="#D02828"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}>
      <Path d="M10 12v5M14 12v5M4 7h16M6 10v8a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-8M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2H9V5Z" />
    </G>
  </Svg>
);

export const AddProductIcon = (props: SvgProps) => (
  <Svg
    fill="none"
    className="w-6 h-6 md:w-12 md:h-12"
    viewBox="0 0 24 24"
    {...props}>
    <Path
      stroke={props.stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 9v10.4c0 .56 0 .84.109 1.054a1 1 0 0 0 .437.437C3.76 21 4.04 21 4.598 21H15m-1-8v-3m0 0V7m0 3h-3m3 0h3M7 13.8V6.2c0-1.12 0-1.68.218-2.108.192-.377.497-.682.874-.874C8.52 3 9.08 3 10.2 3h7.6c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C21 4.52 21 5.08 21 6.2v7.6c0 1.12 0 1.68-.218 2.108a2.001 2.001 0 0 1-.874.874c-.428.218-.986.218-2.104.218h-7.607c-1.118 0-1.678 0-2.105-.218a2 2 0 0 1-.874-.874C7 15.48 7 14.92 7 13.8Z"
    />
  </Svg>
);
