// const spacing = require('./spacing')
const shadow = require("./shadow");

const dataTheme = {
  // ...spacing.spacing,
  ...shadow.shadow,
};

export const lightTheme = {
  ...dataTheme,
  //text
  normal: "rgba(0, 0, 0, 0.87)",
  secondary: `rgba(0, 0, 0, 0.6)`,
  tertiary: `rgba(0, 0, 0, 0.38)`,

  //background
  background: "#F0F2F5",
  backgroundSeconday: "#e3e3e3",
  panel: "#AFAFAFA",
  border: "#ERERER",

  //primary
  primary: "#2673DD",
  primaryMedium: "#CFE2F9",
  primaryLight: "#F5F9FF",

  //status
  warning: "#FFBB00",
  error: "#EE2C4A",
  success: "#44CC77",

  //statusMedium
  warningMedium: "#FFBB00",
  errorMedium: "WFFD6D8",
  successMedium: "#D2FOBD",

  //statusLight
  warningLight: "#FFFBE4",
  errorLight: "#FFF4F4",
  successLight: "#EDFCF5",
};

export const themeMode = {
  ...dataTheme,

  normal: `rgba(255, 255, 255, 0.87)`,
  secondary: `rgba(255, 255, 255, 0.6)`,
  tertiary: `rgba(255, 255, 255, 0.38)`,

  //background
  background: "#121212",
  backgroundSeconday: "#1c1c1c",
  panel: "#222222",
  border: "rgba(255, 255, 255, 0.09)",

  //primary
  primary: "#2673DD",
  primaryMedium: "rgba(38, 115, 221, 0.3)",
  primaryLight: "rgba(38, 115, 221, 0.14)",

  //status
  warning: "rgb(165, 131, 30)",
  error: "rgb(145, 44, 52)",
  success: "rgb(90, 143, 87)",

  //statusMedium
  warningMedium: "rgb(65, 56, 21)",
  errorMedium: "rgb(58, 31, 33)",
  successMedium: "rgb(42, 58, 42)",

  //statusLight
  warningLight: "rgb(43, 39, 22)",
  errorLight: "rgb(39, 22, 22)",
  successLight: "rgb(33, 41, 33)",
};
