import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import Loading from '../components/layouts/loading/Loading';
import { useAppDispatch } from '../hooks/store.hook';
import { addMember } from '../store/thunk-actions/team-action';

const LoadingPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const token = searchParams.get("token")

    useEffect(() => {
        if (token) {
            dispatch(addMember({ query: token })).unwrap()
                .then(() => navigate("/", { replace: true }))
                .catch(() => navigate("/403", { replace: true }))
        }
    }, [token])
    return (
        <Loading />
    )
}

export default LoadingPage