import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import MovieCard from '../components/MovieCard';
import {useDataContext} from '../contexts/DataContext';
import Footer from '../components/Footer';
import i18n from '../config/i18n';

export default function MoviesList() {
  const {movies, colors} = useDataContext();

  const styles = StyleSheet.create({
    label: {
      fontSize: 25,
      textAlign: 'center',
      paddingBottom: 10,
      color: colors.textColor,
    },
    list: {
      width: '100%',
      paddingHorizontal: 10,
      backgroundColor: colors.appBgColor,
    },
    separator: {
      height: 15,
      backgroundColor: 'transparent',
    },
    emptyListMsg: {
      textAlign: 'center',
      fontSize: 18,
      color: colors.textColor,
    },
  });

  return (
    <FlatList
      ListHeaderComponent={
        <Text style={styles.label}>{i18n.t('home.collection')}</Text>
      }
      ListEmptyComponent={
        <Text style={styles.emptyListMsg}>
          No movies collected. Please add your favorites by pressing the plus
          button at the top-right corner of the screen
        </Text>
      }
      style={styles.list}
      keyExtractor={movie => movie.id}
      data={movies}
      renderItem={({item}) => <MovieCard movie={item} />}
      ItemSeparatorComponent={<View style={styles.separator}></View>}
      ListFooterComponent={<Footer />}
    />
  );
}
