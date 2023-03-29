import React from 'react'
import ProfilePhotoForm from '../components/user-forms/ProfilePhotoForm'
import ProfileLayout from '../layouts/profile-layout/ProfileLayout'

const ProfilePhoto = () => {
    return (
        <ProfileLayout title='Personal Photo:'>
            <ProfilePhotoForm />
        </ProfileLayout>
    )
}

export default ProfilePhoto