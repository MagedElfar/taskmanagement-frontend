import React from 'react'
import SingupForm from '../components/signup-form/SingupForm'
import AuthFormLayout from '../layoute/form-layout/AuthFormLayout'

const Signup = () => {
    return (
        <AuthFormLayout title={"Sign up to Taskaty"}>
            <SingupForm />
        </AuthFormLayout>
    )
}

export default Signup