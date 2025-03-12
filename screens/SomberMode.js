import {View, Text, Switch, StyleSheet} from 'react-native';
import React from 'react';
import i18n from '../config/i18n';
import {useDataContext} from '../contexts/DataContext';

export default function SomberMode() {
  const {colors, darkModeswitch, setDarkModeSwitch} = useDataContext();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.appBgColor,
      paddingTop: 20,
      paddingHorizontal: 10,
    },
    subContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    subtitle: {
      fontSize: 20,
      color: colors.textColor,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.subtitle}>{i18n.t('somberMode.subTitle')}</Text>
        <Switch
          value={darkModeswitch}
          onValueChange={() => setDarkModeSwitch(!darkModeswitch)}
        />
      </View>
    </View>
  );
}
