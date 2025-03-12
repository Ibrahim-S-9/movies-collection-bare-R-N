import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useDataContext} from '../contexts/DataContext';
import {useNavigation} from '@react-navigation/native';
import i18n from '../config/i18n';

export default function Languages() {
  const {colors, locale, changeLanguage} = useDataContext();
  const navigation = useNavigation();

  const languages = i18n.t('languagePicker.languages');

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
