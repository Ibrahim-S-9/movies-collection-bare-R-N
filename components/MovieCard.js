import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {useDataContext} from '../contexts/DataContext';

export default function MovieCard({movie}) {
  const {setMovie, colors} = useDataContext();
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    cardContainer: {
      height: 100,
      overflow: 'hidden',
      borderRadius: 10,
      backgroundColor: colors.primaryColor,
    },
    bgImage: {
      flex: 1,
    },
    textContiner: {
      width: '100%',
      maxHeight: 100,
      minHeight: 100,
      padding: 10,
      justifyContent: 'space-between',
    },
    text: {
      fontSize: 20,
      color: 'white',
      textShadowColor: 'black',
      textShadowRadius: 10,
    },
  });

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        setMovie(movie);
        navigation.navigate('Movie');
      }}>
      <ImageBackground
        source={{uri: movie.posterURL}}
        resizeMode="cover"
        style={styles.bgImage}>
        <View style={styles.textContiner}>
          <Text style={[styles.text, {fontSize: 25}]}>
            {movie.title.length < 30
              ? movie.title
              : movie.title.slice(0, 30) + '...'}
          </Text>
          <Text style={styles.text}>{movie.releaseYear}</Text>
          <Text
            style={[
              styles.text,
              {
                width: 55,
                position: 'absolute',
                bottom: 5,
                right: 0,
              },
            ]}>
            <FontAwesome name="star" size={20} color="yellow" />
            {movie.rating}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}


