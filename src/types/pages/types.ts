import { LoginFormType, RegisterFormType } from "../auth/operations"

export type LoginPageType = {
    logIn: (loginForm: LoginFormType) => void
}

export type RegisterPageType = {
    onRegister: (regiseterForm: RegisterFormType) => Promise<any>
}
