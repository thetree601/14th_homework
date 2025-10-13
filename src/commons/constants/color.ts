/**
 * Color Tokens
 * 다크모드를 포함한 모든 색상을 토큰화하여 관리
 */

// Blue 색상 팔레트
export const blue = {
  '05': '#F0F7FF',
  '10': '#DBEEFF',
  '20': '#BDDBFF',
  '30': '#93BEFF',
  '40': '#6DA5FA', // System color
  '50': '#497CFF',
  '60': '#3A5CF3', // System color
  '70': '#274AE1',
  '80': '#1530A6',
  '90': '#0B2184',
} as const;

// Gray 색상 팔레트
export const gray = {
  white: '#FFFFFF',
  '05': '#F2F2F2',
  '10': '#E4E4E4',
  '20': '#D4D3D3',
  '30': '#C7C7C7',
  '40': '#ABABAB',
  '50': '#919191',
  '60': '#777777',
  '70': '#5F5F5F',
  '80': '#333333',
  '90': '#1C1C1C',
  black: '#000000',
} as const;

// Red 색상 팔레트
export const red = {
  '05': '#FDD7DC',
  '10': '#F797A4',
  '20': '#F4677A',
  '30': '#F03851', // Error color
  '40': '#E4112E',
  '50': '#B40E24',
  '60': '#850A1B',
} as const;

// Green 색상 팔레트
export const green = {
  '05': '#D3F3E0',
  '10': '#92E6B9',
  '20': '#15D66F',
  '30': '#12B75F', // Success color
  '40': '#109C51',
  '50': '#0E723C',
  '60': '#084424',
} as const;

// Yellow 색상 팔레트
export const yellow = {
  '05': '#FFE499',
  '10': '#FFD666',
  '20': '#FFC933',
  '30': '#FFB300',
  '40': '#EBA500',
  '50': '#D69600',
  '60': '#B27D00',
} as const;

// Cool Gray 색상 팔레트
export const coolGray = {
  '01': '#F8F8FA',
  '05': '#F6F6F9',
  '10': '#EDEEF2',
  '20': '#DDDFE5',
  '30': '#D2D4DD',
  '40': '#C7C9D5',
  '50': '#BBBECD',
  '60': '#B0B3C4',
} as const;

// Gradient 색상
export const gradient = {
  primary: 'linear-gradient(135deg, #6DA5FA 0%, #92EAF5 100%)',
  skeleton: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 48.5%, rgba(255,255,255,0) 100%)',
} as const;

// 다크모드 색상 (라이트모드와 다르게 적용될 색상들)
export const darkMode = {
  // 다크모드에서는 일반적으로 색상이 반전되거나 조정됨
  background: {
    primary: gray.black,
    secondary: gray['90'],
    tertiary: gray['80'],
  },
  text: {
    primary: gray.white,
    secondary: gray['10'],
    tertiary: gray['30'],
  },
  border: {
    primary: gray['70'],
    secondary: gray['60'],
  },
} as const;

// 라이트모드 색상
export const lightMode = {
  background: {
    primary: gray.white,
    secondary: gray['05'],
    tertiary: gray['10'],
  },
  text: {
    primary: gray.black,
    secondary: gray['70'],
    tertiary: gray['50'],
  },
  border: {
    primary: gray['20'],
    secondary: gray['10'],
  },
} as const;

// 시맨틱 색상 (의미에 따른 색상)
export const semantic = {
  primary: {
    light: blue['40'],
    main: blue['50'],
    dark: blue['60'],
  },
  secondary: {
    light: coolGray['20'],
    main: coolGray['30'],
    dark: coolGray['40'],
  },
  success: {
    light: green['20'],
    main: green['30'],
    dark: green['40'],
  },
  error: {
    light: red['20'],
    main: red['30'],
    dark: red['40'],
  },
  warning: {
    light: yellow['20'],
    main: yellow['30'],
    dark: yellow['40'],
  },
} as const;

// 전체 색상 객체
export const colors = {
  blue,
  gray,
  red,
  green,
  yellow,
  coolGray,
  gradient,
  semantic,
  lightMode,
  darkMode,
} as const;

// 타입 정의
export type ColorPalette = typeof colors;
export type BlueColor = keyof typeof blue;
export type GrayColor = keyof typeof gray;
export type RedColor = keyof typeof red;
export type GreenColor = keyof typeof green;
export type YellowColor = keyof typeof yellow;
export type CoolGrayColor = keyof typeof coolGray;
export type SemanticColor = keyof typeof semantic;

// 색상 값 타입
export type ColorValue = string;

// 색상 팔레트 타입
export type ColorPaletteType = {
  [K in string]: ColorValue | { [K2 in string]: ColorValue };
};

// 기본 export
export default colors;