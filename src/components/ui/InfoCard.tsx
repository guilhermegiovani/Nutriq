import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

type InfoCardProps = {
  title: string;
  children: ReactNode;
};

export function InfoCard({
  title,
  children,
}: InfoCardProps) {
  return (
    <View className="rounded-xl bg-surface px-4 py-4 border border-slate-200">
      <Text className="mb-3 text-base font-semibold text-muted">
        {title}
      </Text>

      {children}
    </View>
  );
}