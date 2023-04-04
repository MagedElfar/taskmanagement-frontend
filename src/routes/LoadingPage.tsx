import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom';
import Loading from '../components/common/loading/Loading';
import { useAppDispatch, useAppSelector } from '../hooks/store.hook';
import { addMember } from '../store/thunk-actions/team-action';

const LoadingPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const { user: { isLoggedIn } } = useAppSelector(state => state)

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const token = searchParams.get("token")

    useEffect(() => {
        if (token && !isLoggedIn) {
            navigate(`/login?token=${token}`, { replace: true })
        } else if (token) {
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