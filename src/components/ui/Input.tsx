import { TextInput } from "react-native";


export function Input({ placeholder, value, onChange }: { placeholder: string, value: string, onChange: (text: string) => void }) {
    return (
        <TextInput
            placeholder={placeholder}
            style={{ borderWidth: 1, borderColor: 'gray', padding: 10, borderRadius: 5 }}
            value={value}
            onChangeText={onChange}
        />
    )
}