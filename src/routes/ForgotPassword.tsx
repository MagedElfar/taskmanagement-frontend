import React from 'react'
import ForgotPassword1 from '../components/forgot-password-form/ForgotPassword1'
import AuthFormLayout from '../layouts/form-layout/AuthFormLayout'
import { useSearchParams } from 'react-router-dom';
import ForgotPassword2 from '../components/forgot-password-form/ForgotPassword2';

const ForgotPassword = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const token = searchParams.get("token")

    return (
        <AuthFormLayout title={"Forgot Password"}>
            {!token ? <ForgotPassword1 /> : <ForgotPassword2 />}
        </AuthFormLayout>
    )
}

export default ForgotPassword