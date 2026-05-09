import { type ReactNode } from 'react';
import { Text } from 'react-native';

export default function TextComponent({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <Text className={`text-black dark:text-white ${className}`}>{children}</Text>;
}
