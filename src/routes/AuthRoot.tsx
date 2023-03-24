import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthRootLayout from '../layouts/aut-root/AuthRootLayout'
const AuthRoot = () => {
    return (
        <AuthRootLayout>
            <Outlet />
        </AuthRootLayout>
    )
}

export default AuthRoot