import React from 'react'
import { Outlet } from 'react-router-dom'
import withGuard from '../utilities/withGuard'

const Root = () => {
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default withGuard(Root)