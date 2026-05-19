import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ScreenContainerProps = {
  /** Conteúdo da tela */
  children: ReactNode;
  /** Se true, envolve em ScrollView para listas longas */
  scrollable?: boolean;
};

/**
 * Layout padrão das telas: safe area + padding + fundo.
 */
export function ScreenContainer({
  children,
  scrollable = false,
}: ScreenContainerProps) {
  const content = (
    <View className="flex-1 bg-background px-4 py-6">{children}</View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'left', 'right']}>
      {scrollable ? (
        <ScrollView
          className="flex-1"
          contentContainerClassName="flex-grow"
          keyboardShouldPersistTaps="handled"
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}
