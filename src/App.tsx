import React, { useEffect, useState } from 'react';
import { RouterProvider } from "react-router-dom";
import Loading from './components/layouts/loading/Loading';
import { useAppDispatch } from './hooks/store.hook';
import Models from './models/Models';
import { getUser } from './store/thunk-actions/user-action';
import routes from './utilities/routes';


const App = () => {
    const dispatch = useAppDispatch();

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getUser()).unwrap().finally(() => setLoading(false))
    }, []);


    return (
        <>
            {isLoading ? <Loading /> : <RouterProvider router={routes} />}
        </>
    )
}

export default App