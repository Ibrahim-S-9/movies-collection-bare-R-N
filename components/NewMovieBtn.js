import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDataContext} from '../contexts/DataContext';

export default function NewMovieBtn() {
  const navigation = useNavigation();
  const {colors} = useDataContext();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Add Movie')}>
      <Ionicons name="add-circle" size={45} color={colors.addBtnColor} />
    </TouchableOpacity>
  );
}
