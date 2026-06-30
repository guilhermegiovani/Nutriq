import { Form } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";


export function LoginScreen() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <View>
            <Form>
                <Input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e)}
                />

                <Input
                    placeholder="Senha"
                    value={password}
                    onChange={(p) => setEmail(p)}
                />

                <Pressable>
                    <Text>Entrar</Text>
                </Pressable>
            </Form>

            <Text>Não possui uma conta?</Text>

            <Pressable>
                <Text>Criar conta</Text>
            </Pressable>
        </View>
    )
}