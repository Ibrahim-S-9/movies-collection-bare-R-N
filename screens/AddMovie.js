import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDataContext} from '../contexts/DataContext';
import {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';


export default function AddMovie() {
  const [newMovie, setNewMovie] = useState({});
  const {movies, setMovies, colors} = useDataContext();
  const navigation = useNavigation();
  const titleRef = useRef();
  const posterUrlRef = useRef();
  const releaseYearRef = useRef();
  const descriptionRef = useRef();
  const imdbUrlRef = useRef();
  const genresRef = useRef();
  const ratingRef = useRef();

  useEffect(() => {
    titleRef.current.focus();
    return () => {
      titleRef.current = null;
      posterUrlRef.current = null;
      releaseYearRef.current = null;
      descriptionRef.current = null;
      imdbUrlRef.current = null;
      genresRef.current = null;
      ratingRef.current = null;
    };
  }, []);

  const HandleSubmit = () => {
    if (
      !newMovie.title ||
      !newMovie.posterURL ||
      !newMovie.releaseYear ||
      !newMovie.description ||
      !newMovie.imdbURL ||
      !newMovie.genres ||
      !newMovie.rating
    ) {
      Alert.alert('Oops!', 'Please fill in all fields before submitting.');
      return;
    }
    setMovies([{...newMovie, id: movies.length + 2}, ...movies]);
    setNewMovie({});
    navigation.goBack();
  };

  const styles = StyleSheet.create({
    form: {
      borderWidth: 1,
      margin: 10,
      padding: 10,
      borderRadius: 10,
      borderColor: colors.textPlaceholderColor,
      gap: 10,
      backgroundColor: colors.secondaryColor,
    },
    label: {fontSize: 25, color: colors.textColor},
    input: {
      backgroundColor: colors.accentColor,
      color: colors.textColor,
      borderRadius: 5,
      fontSize: 18,
    },
    button: {
      width: '100%',
      alignItems: 'center',
      backgroundColor: colors.primaryColor,
      padding: 10,
      borderRadius: 10,
    },
  });

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
    //   extraScrollHeight={80}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{flexGrow: 1}}
      style={{flex: 1, backgroundColor: colors.appBgColor}}>
      <View style={styles.form}>
        <Text style={styles.label}>New movie :</Text>
        <TextInput
          style={styles.input}
          placeholder="Movie's title..."
          placeholderTextColor={colors.textPlaceholderColor}
          autoCapitalize={false}
          autoCorrect={false}
          onChangeText={value => setNewMovie({...newMovie, title: value})}
          returnKeyType="next"
          onSubmitEditing={() => {
            posterUrlRef.current.focus();
          }}
          ref={titleRef}
        />
        <TextInput
          style={styles.input}
          placeholder="Poster's URL..."
          placeholderTextColor={colors.textPlaceholderColor}
          autoCapitalize={false}
          autoCorrect={false}
          keyboardType="url"
          onChangeText={value => setNewMovie({...newMovie, posterURL: value})}
          returnKeyType="next"
          onSubmitEditing={() => releaseYearRef.current.focus()}
          ref={posterUrlRef}
        />
        <TextInput
          style={styles.input}
          placeholder="Release year..."
          placeholderTextColor={colors.textPlaceholderColor}
          keyboardType="numeric"
          onChangeText={value => setNewMovie({...newMovie, releaseYear: value})}
          returnKeyType="next"
          onSubmitEditing={() => descriptionRef.current.focus()}
          ref={releaseYearRef}
        />
        <TextInput
          style={[styles.input, {height: 100, textAlignVertical: 'top'}]}
          placeholder="Description..."
          placeholderTextColor={colors.textPlaceholderColor}
          multiline
          autoCapitalize={false}
          autoCorrect={false}
          onChangeText={value => setNewMovie({...newMovie, description: value})}
          returnKeyType="next"
          onSubmitEditing={() => imdbUrlRef.current.focus()}
          ref={descriptionRef}
        />
        <TextInput
          style={styles.input}
          placeholder="IMDB URL..."
          placeholderTextColor={colors.textPlaceholderColor}
          autoCapitalize={false}
          autoCorrect={false}
          keyboardType="url"
          onChangeText={value => setNewMovie({...newMovie, imdbURL: value})}
          returnKeyType="next"
          onSubmitEditing={() => genresRef.current.focus()}
          ref={imdbUrlRef}
        />
        <TextInput
          style={styles.input}
          placeholder="Genre(s)...[ separated by commas ]"
          placeholderTextColor={colors.textPlaceholderColor}
          onChangeText={value =>
            setNewMovie({
              ...newMovie,
              genres: value.split(',').map(genre => genre.trim()),
            })
          }
          returnKeyType="next"
          onSubmitEditing={() => ratingRef.current.focus()}
          ref={genresRef}
        />
        <TextInput
          style={styles.input}
          placeholder="Your Rating...[ from 0 to 10 ]"
          placeholderTextColor={colors.textPlaceholderColor}
          keyboardType="numeric"
          onChangeText={value => setNewMovie({...newMovie, rating: value})}
          returnKeyType="done"
          onSubmitEditing={HandleSubmit}
          ref={ratingRef}
        />

        <Pressable style={styles.button} onPress={HandleSubmit}>
          <Text style={{fontSize: 18, color: 'white'}}>Add</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}
