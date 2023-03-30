import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/store.hook";

const withRole = (Component: React.FC) => {
    const WrappedComponent = (props: any) => {

        const { user: userState, space } = useAppSelector((state) => state);

        return (
            <>
                {userState.role !== "owner" || !space.id ? <Navigate to="/" replace={true} /> : <Component {...props} />}
            </>
        )

    }

    return WrappedComponent;
}

export default withRole