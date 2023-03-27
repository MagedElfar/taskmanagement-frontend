import React from 'react';
import { Navigate } from "react-router-dom";
import { useAppSelector } from '../hooks/store.hook';

const guardRequired = (Component: React.FC) => {
    const WrappedComponent = (props: any) => {
        const userState = useAppSelector((state) => state.user);

        console.log("user = ", userState)

        return (
            <>
                {userState.isLoggedIn ? <Component {...props} /> : <Navigate to="/login" replace={true} />}
            </>
        )

    }

    return WrappedComponent;
}

const noGuardRequired = (Component: React.FC) => {
    const WrappedComponent = (props: any) => {

        const userState = useAppSelector((state) => state.user);

        return (
            <>
                {userState.isLoggedIn ? <Navigate to="/" replace={true} /> : <Component {...props} />}
            </>
        )

    }

    return WrappedComponent;
}

const withGuard = (Component: React.FC, isGuard: boolean = true) => {
    switch (isGuard) {
        case false:
            return noGuardRequired(Component)
        case true:
        default:
            return guardRequired(Component)
    }
}

export default withGuard