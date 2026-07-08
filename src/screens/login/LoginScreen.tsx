import { Form } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/context/AuthContext";
import { AuthStackParamList, AppStackParamList } from "@/navigation/types";
import { login } from "@/services/api/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type Props = NativeStackScreenProps<AuthStackParamList, typeof ROUTES.LOGIN>;

export function LoginScreen({ navigation }: Props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { signIn } = useAuth()

    async function handleLogin() {
        try {
            const response = await signIn({
                email,
                password,
            });

            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ScreenContainer>
            <View className="flex-1 pt-28 px-4">
                <Text className="text-center text-4xl font-bold text-primary">
                    NutriQ
                </Text>

                <Text className="mt-2 text-center text-base text-muted">
                    Faça login para continuar
                </Text>

                <Form className="mt-10 gap-4">
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

                    <Pressable
                        className="mt-4 rounded-xl bg-primary py-4 active:opacity-80"
                        onPress={handleLogin}
                    >
                        <Text className="text-center font-semibold text-white">
                            Entrar
                        </Text>
                    </Pressable>
                </Form>

                <View className="mt-8 flex-row justify-center">
                    <Text className="text-muted">
                        Não possui uma conta?
                    </Text>

                    <Pressable
                        className="ml-2 active:opacity-80"
                        onPress={() => navigation.replace(ROUTES.REGISTER)}
                    >
                        <Text className="font-semibold text-primary">
                            Criar conta
                        </Text>
                    </Pressable>

                </View>
            </View>
        </ScreenContainer>
    )
}