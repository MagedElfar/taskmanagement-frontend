import { createBrowserRouter } from "react-router-dom";
import AuthRoot from "../routes/AuthRoot";
import Root from "../routes/Root";
import Login from "../routes/Login";
import Signup from "../routes/Signup";
import ForgotPassword from "../routes/ForgotPassword";
import Profile from "../routes/Profile";
import PersonalInformation from "../routes/PersonalInformation";
import ProfilePhoto from "../routes/ProfilePhoto";
import Privacy from "../routes/Privacy";
import Space from "../routes/Space";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <div>home</div>
            },
            {
                path: "profile",
                element: <Profile />,
                children: [
                    {
                        index: true,
                        element: <PersonalInformation />
                    },
                    {
                        path: "photo",
                        element: <ProfilePhoto />
                    },
                    {
                        path: "privacy",
                        element: <Privacy />
                    }
                ]
            },
            {
                path: "space",
                element: <Space />
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
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            }
        ]
    },

    {
        path: "*",
        element: <div>404</div>
    }
])

export default routes