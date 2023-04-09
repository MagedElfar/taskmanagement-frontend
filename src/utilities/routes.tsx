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
import LoadingPage from "../routes/LoadingPage";
import Home from "../routes/Home";
import Task from "../routes/Task";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <Home />
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
            },
            {
                path: "task",
                children: [
                    {
                        path: ":id",
                        element: <Task />
                    }
                ]
            },
            {
                path: "projects",
                children: [
                    {
                        path: ":id",
                        element: <div>home</div>
                    }
                ]
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
        path: "loading",
        element: <LoadingPage />
    },

    {
        path: "*",
        element: <div>404</div>
    }
])

export default routes