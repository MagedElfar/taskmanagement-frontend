import { Box } from '@mui/material'
import React from 'react'
import ProfileForm from '../components/user-forms/ProfileForm'
import ProfileLayout from '../layouts/profile-layout/ProfileLayout'

const PersonalInformation = () => {
    return (
        <ProfileLayout title='Personal Information:'>
            <ProfileForm />
        </ProfileLayout>
    )
}

export default PersonalInformation