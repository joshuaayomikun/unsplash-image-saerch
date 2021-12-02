import { createContext } from "react";
import useAuthentication from "../hooks/authentication";

export const AuthContext = createContext<ReturnType<typeof useAuthentication>>({
    user: undefined,
    token: "",
    error:undefined,
    signIn: () => (""),
    signOut: () => (""),
    loginWithunSplash: async (code?: string) =>{}
})
interface AuthProviderProps {
    children: JSX.Element | JSX.Element []
}
export default function AuthProvider(props: AuthProviderProps) {

    return <AuthContext.Provider value={useAuthentication()}>
        {props.children}
    </AuthContext.Provider>
}