export const usethemeProvider = isDarkMode => {
  const lightMode = {
    primaryColor: '#8db0bb',
    secondaryColor: 'white',
    accentColor: '#befaff',
    textColor: 'black',
    textPlaceholderColor: 'dimgrey',
    secondAccentColor: '#BEFAFF6B',
    dangerColor: 'red',
    appBgColor: '#F3F7FF',
    ratingStarColor: 'yellow',
    headerColor: 'white',
    addBtnColor: '#8db0bb',
    statusBarColor: 'dark-content',
  };
  const darkMode = {
    primaryColor: '#333333',
    secondaryColor: '#404040',
    accentColor: '#4A4A4A',
    textColor: 'white',
    textPlaceholderColor: '#DFDFDFCC',
    secondAccentColor: '#4A4A4AB0',
    dangerColor: 'red',
    appBgColor: '#222222',
    ratingStarColor: 'yellow',
    headerColor: '#4A4A4AB0',
    addBtnColor: 'white',
    statusBarColor: 'light-content',
  };

  return isDarkMode === true ? darkMode : lightMode;
};
