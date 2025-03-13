import {createContext, useContext, useEffect, useState} from 'react';
import MoviesData from '../MoviesData.json';
import {usethemeProvider} from '../styles/globalVariables';
import {useColorScheme} from 'react-native';
import i18n from '../config/i18n';

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

export function DataContextProvider({children}) {
  const [movies, setMovies] = useState(MoviesData);
  const [movie, setMovie] = useState({});
  const [selectedMovie, setSelectedMovie] = useState({});
  const isDarkMode = useColorScheme() === 'dark';
  const [darkModeswitch, setDarkModeSwitch] = useState(isDarkMode);

  useEffect(() => {
    setDarkModeSwitch(isDarkMode);
  }, [isDarkMode]);

  const colors = usethemeProvider(darkModeswitch);

  const [locale, setLocale] = useState(i18n.locale);

  const changeLanguage = lang => {
    i18n.locale = lang;
    setLocale(lang);
  };

  return (
    <DataContext.Provider
      value={{
        movies,
        setMovies,
        movie,
        setMovie,
        selectedMovie,
        setSelectedMovie,
        colors,
        locale,
        changeLanguage,
        darkModeswitch,
        setDarkModeSwitch,
      }}>
      {children}
    </DataContext.Provider>
  );
}
