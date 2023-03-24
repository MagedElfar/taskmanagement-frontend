import React from 'react'
import LoginForm from '../components/login-form/LoginForm'
import AuthFormLayout from '../layouts/form-layout/AuthFormLayout'

const Login = () => {
    return (
        <AuthFormLayout title={"Log in to Taskaty"}>
            <LoginForm />
        </AuthFormLayout>
    )
}

export default Login