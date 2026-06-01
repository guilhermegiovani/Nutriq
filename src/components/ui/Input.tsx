import clsx from 'clsx';
import { TextInput, type KeyboardTypeOptions } from 'react-native';

type InputProps = {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
};

export function Input({
  placeholder,
  value,
  onChange,
  keyboardType = 'default',
}: InputProps) {
  return (
    <TextInput
      placeholder={placeholder}
      className={clsx(
        "rounded-lg border border-slate-300 bg-surface px-3 py-2.5 text-text"
      )}
      value={value}
      onChangeText={onChange}
      keyboardType={keyboardType}
    />
  );
}
