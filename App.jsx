import Main from './components/Main';
import {DataContextProvider} from './contexts/DataContext';

export default function App() {
  return (
    <DataContextProvider>
      <Main />
    </DataContextProvider>
  );
}
