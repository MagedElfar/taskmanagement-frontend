import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthRootLayout from '../layouts/aut-root/AuthRootLayout'
import withGuard from '../utilities/withGuard'
const AuthRoot = () => {
    return (
        <AuthRootLayout>
            <Outlet />
        </AuthRootLayout>
    )
}

export default withGuard(AuthRoot, false)