import {Pressable, Image, Linking, Alert} from 'react-native';
import React from 'react';
import {useDataContext} from '../contexts/DataContext';

export default function ImdbBtn() {
  const {movie} = useDataContext();
  const handleLinking = async () => {
    try {
      const supported = await Linking.canOpenURL(movie.imdbURL);

      if (supported) {
        await Linking.openURL(movie.imdbURL);
      } else {
        console.log('Cannot open URL');
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };
  const imdbLogo =
    'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/171_Imdb_logo_logos-512.png';

  return (
    <Pressable onPress={handleLinking}>
      <Image
        source={{
          uri: imdbLogo,
        }}
        width={50}
        height={50}
      />
    </Pressable>
  );
}
