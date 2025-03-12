import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDataContext} from '../contexts/DataContext';
import {useNavigation} from '@react-navigation/native';
import i18n from '../config/i18n';

export default function Footer() {
  const {colors} = useDataContext();
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    footer: {
      padding: 20,
      boxSizing: 'border-box',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    somberBtn: {
      //   backgroundColor: colors.primaryColor,
      alignItems: 'center',
      borderRadius: 20,
      padding: 10,
    },

    footerText: {
      fontSize: 20,
      color: colors.textColor,
      //   textDecorationLine: 'underline',
    },
  });
  return (
    <View style={styles.footer}>
      <Pressable
        style={styles.somberBtn}
        onPress={() => navigation.navigate('Languages')}>
        <Text style={[styles.footerText, {textDecorationLine: 'underline'}]}>
          {i18n.t('home.languagesBtn')} &darr;
        </Text>
      </Pressable>
      <TouchableOpacity
        style={styles.somberBtn}
        onPress={() => navigation.navigate('Somber Mode')}>
        <Text style={styles.footerText}>{i18n.t('home.somberBtn')}</Text>
      </TouchableOpacity>
    </View>
  );
}
