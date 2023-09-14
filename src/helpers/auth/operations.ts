import { LoginFormType, RegisterFormType } from "@/types/auth/operations";
import { signIn } from "next-auth/react";

export const logIn = async (loginForm: LoginFormType) => {
    const response = await signIn("credentials", {
        ...loginForm,
        redirect: false
    });
    return response;
}

export const register = async (registerForm: RegisterFormType) => {
    const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerForm)
    });

    const data = await response.json();
    if (data?.error) {
        return Promise.resolve(data);
    }

    return Promise.resolve(await logIn(registerForm));
}