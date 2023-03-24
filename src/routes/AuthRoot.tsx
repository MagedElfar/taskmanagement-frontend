import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthRootLayout from '../layoute/aut-root/AuthRootLayout'
const AuthRoot = () => {
    return (
        <AuthRootLayout>
            <Outlet />
        </AuthRootLayout>
    )
}

export default AuthRoot