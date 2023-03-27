export interface LoginCredentials {
    email: string,
    password: string
}

export interface SignupCredentials extends LoginCredentials {
    password: string
}