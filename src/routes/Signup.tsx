import React from 'react'
import SingupForm from '../components/signup-form/SingupForm'
import AuthFormLayout from '../layouts/form-layout/AuthFormLayout'

const Signup = () => {
    return (
        <AuthFormLayout title={"Sign up in Taskaty"}>
            <SingupForm />
        </AuthFormLayout>
    )
}

export default Signup