import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useDataContext} from '../contexts/DataContext';
import {useNavigation} from '@react-navigation/native';

export default function Languages() {
  const {colors, locale, changeLanguage} = useDataContext();
  const navigation = useNavigation();

  const languages = [
    {code: 'en', name: 'English'},
    {code: 'es', name: 'Español'},
    {code: 'fr', name: 'Français'},
    {code: 'de', name: 'Deutsch'},
    {code: 'it', name: 'Italiano'},
    {code: 'pt', name: 'Português'},
    {code: 'ru', name: 'Русский'},
    {code: 'zh', name: '中文 (简体)'},
    {code: 'ja', name: '日本語'},
    {code: 'ko', name: '한국어'},
    {code: 'ar', name: 'العربية'},
  ];

  const styles = StyleSheet.create({
    list: {
      backgroundColor: colors.appBgColor,
    },
    option: {
      color: colors.textColor,
      fontSize: 25,
      padding: 10,
    },
    separator: {
      width: '100%',
      height: 1,
      backgroundColor: colors.textPlaceholderColor,
    },
  });

  const handlePick = lang => {
    changeLanguage(lang);
    navigation.goBack();
  };

  return (
    <FlatList
      keyExtractor={lang => lang.code}
      data={languages}
      style={styles.list}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => handlePick(item.code)}>
          <Text style={styles.option}>{item.name}</Text>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={<View style={styles.separator}></View>}
    />
  );
}
