import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import DefaultSignup from './DefaultSignup';
import InviteSignup from './InviteSignup';


const SingupForm = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const token = searchParams.get("token")

    return (
        <>
            {!token ? <DefaultSignup /> : <InviteSignup />}
        </>
    )
}

export default SingupForm