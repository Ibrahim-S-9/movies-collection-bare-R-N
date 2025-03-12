import {createContext, useContext, useState} from 'react';
import MoviesData from '../MoviesData.json';
import {usethemeProvider} from '../styles/globalVariables';
import {useColorScheme} from 'react-native';

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

export function DataContextProvider({children}) {
  const [movies, setMovies] = useState(MoviesData);
  const [movie, setMovie] = useState({});
  const [selectedMovie, setSelectedMovie] = useState({});
  const isDarkMode = useColorScheme() === 'dark';
  const colors = usethemeProvider(isDarkMode);

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
      }}>
      {children}
    </DataContext.Provider>
  );
}
