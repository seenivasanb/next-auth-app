import { LoginFormType, RegisterFormType } from "../auth/operations"

export type LoginPageType = {
    onLogin?: (loginForm: LoginFormType) => void
}

export type RegisterPageType = {
    onRegister?: (regiseterForm: RegisterFormType) => Promise<any>
}
