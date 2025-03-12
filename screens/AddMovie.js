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
import i18n from '../config/i18n';

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
      Alert.alert(
        i18n.t('alerts.missingFieldAlertTitle'),
        i18n.t('alerts.missingFieldAlertMsg'),
      );
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
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{flexGrow: 1}}
      style={{flex: 1, backgroundColor: colors.appBgColor}}>
      <View style={styles.form}>
        <Text style={styles.label}>{i18n.t('addMovie.label')}</Text>
        <TextInput
          style={styles.input}
          placeholder={i18n.t('addMovie.movieTitlePH')}
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
          placeholder={i18n.t('addMovie.moviePosterPH')}
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
          placeholder={i18n.t('addMovie.movieReleaseYearPH')}
          placeholderTextColor={colors.textPlaceholderColor}
          keyboardType="numeric"
          onChangeText={value => setNewMovie({...newMovie, releaseYear: value})}
          returnKeyType="next"
          onSubmitEditing={() => descriptionRef.current.focus()}
          ref={releaseYearRef}
        />
        <TextInput
          style={[styles.input, {height: 100, textAlignVertical: 'top'}]}
          placeholder={i18n.t('addMovie.movieDescriptionPH')}
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
          placeholder={i18n.t('addMovie.movieImdbPH')}
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
          placeholder={i18n.t('addMovie.movieGenresPH')}
          placeholderTextColor={colors.textPlaceholderColor}
          onChangeText={value =>
            setNewMovie({
              ...newMovie,
              genres: value
                .trim()
                .split(',')
                .map(genre => genre.trim()),
            })
          }
          returnKeyType="next"
          onSubmitEditing={() => ratingRef.current.focus()}
          ref={genresRef}
        />
        <TextInput
          style={styles.input}
          placeholder={i18n.t('addMovie.movieRatingPH')}
          placeholderTextColor={colors.textPlaceholderColor}
          keyboardType="numeric"
          onChangeText={value => setNewMovie({...newMovie, rating: value})}
          returnKeyType="done"
          onSubmitEditing={HandleSubmit}
          ref={ratingRef}
        />

        <Pressable style={styles.button} onPress={HandleSubmit}>
          <Text style={{fontSize: 18, color: 'white'}}>
            {i18n.t('addMovie.submitBtn')}
          </Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}
