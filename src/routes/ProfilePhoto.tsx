import React from 'react'
import ProfilePhotoForm from '../components/profile-photo-form/ProfilePhotoForm'
import ProfileLayout from '../layouts/profile-layout/ProfileLayout'

const ProfilePhoto = () => {
    return (
        <ProfileLayout title='Personal Photo:'>
            <ProfilePhotoForm />
        </ProfileLayout>
    )
}

export default ProfilePhoto