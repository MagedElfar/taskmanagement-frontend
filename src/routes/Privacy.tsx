import React from 'react'
import ChangePasswordForm from '../components/change-password-form/ChangePasswordForm'
import ProfileLayout from '../layouts/profile-layout/ProfileLayout'

const Privacy = () => {
    return (
        <ProfileLayout title='Privacy & Security:'>
            <ChangePasswordForm />
        </ProfileLayout>
    )
}

export default Privacy