import React from 'react'
import AuthFormLayout from '../layouts/form-layout/AuthFormLayout'
import { useAppSelector } from '../hooks/store.hook'
import SingupForm from '../components/auth-forms/SingupForm'
import AccountDetailsForm from '../components/auth-forms/AccountDetailsForm'
import UploadImageForm from '../components/auth-forms/UploadImageForm'

const Signup = () => {
    const step = useAppSelector(s => s.auth.step)
    return (
        <AuthFormLayout title={
            step === 1 ? "Sign up in Taskaty"
                : step === 2 ? "Account Details" : "Add your Profile Picture"
        }>
            {step === 1 ?
                <SingupForm />
                : step === 2 ?
                    <AccountDetailsForm />
                    : <UploadImageForm />
            }
        </AuthFormLayout>
    )
}

export default Signup