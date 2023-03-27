import { createBrowserRouter } from "react-router-dom";
import AuthRoot from "../routes/AuthRoot";
import Root from "../routes/Root";
import Login from "../routes/Login";
import Signup from "../routes/Signup";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <div>home</div>
            }
        ]
    },
    {
        path: "/",
        element: <AuthRoot />,
        children: [
            {
                path: "Signup",
                element: <Signup />
            },
            {
                path: "login",
                element: <Login />
            }
        ]
    },

    {
        path: "*",
        element: <div>404</div>
    }
])

export default routes