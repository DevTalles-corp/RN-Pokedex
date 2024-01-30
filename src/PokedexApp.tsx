import 'react-native-gesture-handler';

import {StackNavigator} from './presentation/navigator/StackNavigator';
import {ThemeContextProvider} from './presentation/context/ThemeContext';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

export const PokedexApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <StackNavigator />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
};
