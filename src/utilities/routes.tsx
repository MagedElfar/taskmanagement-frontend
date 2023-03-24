import { createBrowserRouter } from "react-router-dom";
import AuthRoot from "../routes/AuthRoot";
import Root from "../routes/AuthRoot";
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
            }
        ]
    },

    {
        path: "*",
        element: <div>404</div>
    }
])

export default routes