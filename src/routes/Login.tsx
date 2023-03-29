import React from 'react'
import LoginForm from '../components/auth-forms/LoginForm'
import AuthFormLayout from '../layouts/form-layout/AuthFormLayout'

const Login = () => {
    return (
        <AuthFormLayout title={"Log in to Taskaty"}>
            <LoginForm />
        </AuthFormLayout>
    )
}

export default Login