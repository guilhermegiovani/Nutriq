import { StatusBar } from 'expo-status-bar';

import { AppProviders } from '@/app/AppProviders';
import { RootNavigator } from '@/navigation/RootNavigator';

/**
 * Componente raiz do Nutriq.
 * Providers globais + navegação + status bar.
 */
export default function App() {
  return (
    <AppProviders>
      <RootNavigator />
      <StatusBar style="auto" />
    </AppProviders>
  );
}
