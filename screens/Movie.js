import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDataContext} from '../contexts/DataContext';
import {useNavigation} from '@react-navigation/native';

export default function Movie() {
  const {movies, setMovies, movie, setSelectedMovie, colors} = useDataContext();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({title: movie.title});
  }, [movie]);

  const handleEdition = () => {
    setSelectedMovie(movie);
    navigation.navigate('Edit Movie');
  };

  const handleDeletion = () => {
    Alert.alert(
      'Delete confirmation',
      'Are you sure you want to proceed?',
      [
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
        {
          text: 'Yes',
          onPress: () => {
            setMovies(movies.filter(item => item.id !== movie.id));
            navigation.goBack();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.appBgColor,
    },
    title: {
      fontSize: 44,
      fontWeight: 'bold',
      width: '95%',
      color: colors.textColor,
    },
    details: {
      fontSize: 25,
      color: colors.textColor,
    },
    editBtn: {
      width: '70%',
      backgroundColor: colors.primaryColor,
      alignItems: 'center',
      borderRadius: 10,
      padding: 10,
      fontSize: 18,
      marginTop: 10,
    },
    deleteBtn: {
      width: '70%',
      alignItems: 'center',
      backgroundColor: colors.dangerColor,
      padding: 10,
      borderRadius: 10,
      marginTop: 10,
      marginBottom: 10,
    },
    rating: {
      textShadowColor: 'black',
      textShadowRadius: 5,
    },
    genresContainerOuter: {
      minWidthwidth: '95%',
      marginTop: 15,
    },
    genresContainerInner: {
      minWidth: '100%',
      paddingVertical: 10,
    },
    genreText: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderWidth: 5,
      borderColor: colors.accentColor,
      backgroundColor: colors.accentColor,
      color: colors.textColor,
      borderRadius: 20,
      fontSize: 20,
      marginHorizontal: 5,
    },
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{alignItems: 'center', padding: 5}}>
      <Image
        source={{uri: movie.posterURL}}
        width="95%"
        height={550}
        style={{borderRadius: 10}}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <View
        style={{
          flexDirection: 'row',
          width: '95%',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.details}>{movie.releaseYear}</Text>
        <Text style={styles.details}>
          <FontAwesome
            name="star"
            size={29}
            color="yellow"
            style={styles.rating}
          />
          {movie.rating}
        </Text>
      </View>
      <ScrollView
        style={styles.genresContainerOuter}
        contentContainerStyle={styles.genresContainerInner}
        horizontal>
        {movie?.genres.map((genre, i) => (
          <Text key={i} style={styles.genreText}>
            {genre}
          </Text>
        ))}
      </ScrollView>
      <Text style={[styles.details, {width: '95%', marginTop: 10}]}>
        {movie.description}
      </Text>
      <TouchableOpacity onPress={handleEdition} style={styles.editBtn}>
        <Text style={[styles.details, {color: 'white'}]}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDeletion} style={styles.deleteBtn}>
        <Text style={[styles.details, {color: 'white'}]}>Delete movie</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
