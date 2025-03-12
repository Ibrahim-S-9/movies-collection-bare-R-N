import {StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AddMovie from '../screens/AddMovie';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useDataContext} from '../contexts/DataContext';
import MoviesList from '../screens/MoviesList';
import Movie from '../screens/Movie';
import ImdbBtn from './ImdbBtn';
import EditMovie from '../screens/EditMovie';
import NewMovieBtn from './NewMovieBtn';

export default function Main() {
  const Stack = createNativeStackNavigator();
  const {colors} = useDataContext();

  const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.appBgColor,
    },
  });

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar
        barStyle={colors.statusBarColor}
        backgroundColor={colors.appBgColor}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {backgroundColor: colors.headerColor},
            headerTintColor: colors.textColor,
          }}>
          <Stack.Screen
            name="Home"
            component={MoviesList}
            options={{headerRight: () => <NewMovieBtn />}}
          />
          <Stack.Screen name="Add Movie" component={AddMovie} />
          <Stack.Screen
            name="Movie"
            component={Movie}
            options={({}) => ({
              headerRight: () => <ImdbBtn />,
            })}
          />
          <Stack.Screen name="Edit Movie" component={EditMovie} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
