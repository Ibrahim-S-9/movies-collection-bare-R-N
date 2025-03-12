import {useNavigation} from '@react-navigation/native';
import {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable, Alert} from 'react-native';
import {useDataContext} from '../contexts/DataContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import i18n from '../config/i18n';

export default function EditMovie() {
  const {movies, setMovies, setMovie, selectedMovie, setSelectedMovie, colors} =
    useDataContext();
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
      !selectedMovie.title ||
      !selectedMovie.posterURL ||
      !selectedMovie.releaseYear ||
      !selectedMovie.description ||
      !selectedMovie.imdbURL ||
      !selectedMovie.genres ||
      !selectedMovie.rating
    ) {
      Alert.alert(
        i18n.t('alerts.missingFieldAlertTitle'),
        i18n.t('alerts.missingFieldAlertMsg'),
      );
      return; 
    }

    const updatedData = movies.map(movie =>
      movie.id === selectedMovie.id ? selectedMovie : movie,
    );
    setMovies(updatedData);
    setMovie(selectedMovie);
    setSelectedMovie({});
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
    subtitle: {
      fontSize: 19,
      color: colors.textColor,
    },
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
      extraScrollHeight={80}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{flexGrow: 1}}
      style={{flex: 1, backgroundColor: colors.appBgColor}}>
      <View style={styles.form}>
        <Text style={styles.label}>{i18n.t('editMovie.label')}</Text>
        <Text style={styles.subtitle}>{i18n.t('editMovie.movieTitleST')}</Text>
        <TextInput
          style={styles.input}
          placeholder={i18n.t('editMovie.movieTitlePH')}
          placeholderTextColor={colors.textPlaceholderColor}
          autoCapitalize={false}
          autoCorrect={false}
          value={selectedMovie.title}
          onChangeText={value =>
            setSelectedMovie({...selectedMovie, title: value})
          }
          returnKeyType="next"
          onSubmitEditing={() => {
            posterUrlRef.current.focus();
          }}
          ref={titleRef}
        />
        <Text style={styles.subtitle}>{i18n.t('editMovie.moviePosterST')}</Text>
        <TextInput
          style={styles.input}
          placeholder={i18n.t('editMovie.moviePosterPH')}
          placeholderTextColor={colors.textPlaceholderColor}
          autoCapitalize={false}
          autoCorrect={false}
          keyboardType="url"
          value={selectedMovie.posterURL}
          onChangeText={value =>
            setSelectedMovie({...selectedMovie, posterURL: value})
          }
          returnKeyType="next"
          onSubmitEditing={() => releaseYearRef.current.focus()}
          ref={posterUrlRef}
        />
        <Text style={styles.subtitle}>
          {i18n.t('editMovie.movieReleaseYearST')}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={i18n.t('editMovie.movieReleaseYearPH')}
          placeholderTextColor={colors.textPlaceholderColor}
          keyboardType="numeric"
          value={selectedMovie.releaseYear.toString()}
          onChangeText={value =>
            setSelectedMovie({...selectedMovie, releaseYear: value})
          }
          returnKeyType="next"
          onSubmitEditing={() => descriptionRef.current.focus()}
          ref={releaseYearRef}
        />
        <Text style={styles.subtitle}>
          {i18n.t('editMovie.movieDescriptionST')}
        </Text>
        <TextInput
          style={[styles.input, {height: 100, textAlignVertical: 'top'}]}
          placeholder={i18n.t('editMovie.movieDescriptionPH')}
          placeholderTextColor={colors.textPlaceholderColor}
          multiline
          autoCapitalize={false}
          autoCorrect={false}
          value={selectedMovie.description}
          onChangeText={value =>
            setSelectedMovie({...selectedMovie, description: value})
          }
          returnKeyType="next"
          onSubmitEditing={() => imdbUrlRef.current.focus()}
          ref={descriptionRef}
        />
        <Text style={styles.subtitle}>{i18n.t('editMovie.movieImdbST')}</Text>
        <TextInput
          style={styles.input}
          placeholder={i18n.t('editMovie.movieImdbPH')}
          placeholderTextColor={colors.textPlaceholderColor}
          autoCapitalize={false}
          autoCorrect={false}
          keyboardType="url"
          value={selectedMovie.imdbURL}
          onChangeText={value =>
            setSelectedMovie({...selectedMovie, imdbURL: value})
          }
          returnKeyType="next"
          onSubmitEditing={() => genresRef.current.focus()}
          ref={imdbUrlRef}
        />
        <Text style={styles.subtitle}>{i18n.t('editMovie.movieGenresST')}</Text>
        <TextInput
          style={styles.input}
          placeholder={i18n.t('editMovie.movieGenresPH')}
          placeholderTextColor={colors.textPlaceholderColor}
          value={selectedMovie.genres.join(', ')}
          onChangeText={value =>
            setSelectedMovie({
              ...selectedMovie,
              genres: value.split(',').map(genre => genre.trim()),
            })
          }
          returnKeyType="next"
          onSubmitEditing={() => ratingRef.current.focus()}
          ref={genresRef}
        />
        <Text style={styles.subtitle}>{i18n.t('editMovie.movieRatingST')}</Text>
        <TextInput
          style={styles.input}
          placeholder={i18n.t('editMovie.movieRatingPH')}
          placeholderTextColor={colors.textPlaceholderColor}
          keyboardType="numeric"
          value={selectedMovie.rating.toString()}
          onChangeText={value =>
            setSelectedMovie({...selectedMovie, rating: value})
          }
          returnKeyType="done"
          onSubmitEditing={HandleSubmit}
          ref={ratingRef}
        />

        <Pressable style={styles.button} onPress={HandleSubmit}>
          <Text style={{fontSize: 18, color: 'white'}}>
            {i18n.t('editMovie.submitBtn')}
          </Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}
