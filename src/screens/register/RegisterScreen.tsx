import { Form } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { ROUTES } from "@/constants/routes";
import { AuthStackParamList } from "@/navigation/types";
import { register } from "@/services/api/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type Props = NativeStackScreenProps<AuthStackParamList, typeof ROUTES.REGISTER>;

export function RegisterScreen({ navigation }: Props) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    async function handleRegister() {
        try {
            const response = await register({
                name,
                email,
                password,
                confirmPassword
            });

            console.log(response);
            navigation.replace(ROUTES.LOGIN);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ScreenContainer>
            <View className="flex-1 pt-20 px-4">
                <Text className="text-center text-4xl font-bold text-primary">
                    NutriQ
                </Text>

                <Text className="mt-2 text-center text-base text-muted">
                    Crie sua conta para começar
                </Text>

                <Form className="mt-10 gap-4">
                    <Input
                        placeholder="Nome completo"
                        value={name}
                        onChange={(n) => setName(n)}
                    />

                    <Input
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e)}
                    />

                    <Input
                        placeholder="Senha"
                        value={password}
                        onChange={(p) => setPassword(p)}
                    />

                    <Input
                        placeholder="Confirmar senha"
                        value={confirmPassword}
                        onChange={(cp) => setConfirmPassword(cp)}
                    />

                    <Pressable
                        className="mt-4 rounded-xl bg-primary py-4 active:opacity-80"
                        onPress={handleRegister}
                    >
                        <Text className="text-center font-semibold text-white">
                            Criar conta
                        </Text>
                    </Pressable>
                </Form>

                <View className="mt-8 flex-row justify-center">
                    <Text className="text-muted">
                        Já possui uma conta?
                    </Text>

                    <Pressable
                        className="ml-2 active:opacity-80"
                        onPress={() => navigation.replace(ROUTES.LOGIN)}
                    >
                        <Text className="font-semibold text-primary">
                            Entrar
                        </Text>
                    </Pressable>

                </View>
            </View>
        </ScreenContainer>
    )
}