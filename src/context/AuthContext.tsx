import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { LoginDTO } from "@/types/auth";
import { User } from "@/types/user";
import { getMe, login } from "@/services/api/auth";
import { tokenStorage } from "@/services/storage/tokenStorage";
import { Alert } from "react-native";

export type AuthContextValue = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    signIn: (credentials: LoginDTO) => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const isAuthenticated = !!user;

    useEffect(() => {
        restoreSession();
    }, []);

    const signIn = async (credentials: LoginDTO) => {
        setIsLoading(true);
        try {
            const response = await login(credentials);
            await tokenStorage.save(response.token);
            setUser(response.user);
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signOut = async () => {
        setIsLoading(true);
        try {
            await tokenStorage.remove();
            setUser(null);
        } catch (error) {
            Alert.alert("Erro", "Credenciais inválidos");
        } finally {
            setIsLoading(false);
        }
    };

    const restoreSession = async () => {
        try {
            const token = await tokenStorage.get();
            if (!token) {
                setIsLoading(false);
                return;
            }

            const user = await getMe();
            setUser(user)

        } catch (error) {
            console.error("Erro ao restaurar sessão:", error);
            await tokenStorage.remove();
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth deve ser usado dentro de AuthProvider');
    }

    return context;
}