import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../MainLayout/MainLayout";
import PrivateRouter from "../../PrivaterRouters/PrivateRouter";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ResetPassword from "../Pages/ResetPassword/ResetPassword";
import ShortLinks from "../Pages/ShortLinks/ShortLinks";

export const routers = createBrowserRouter([
    {
        path: "/", element: <MainLayout></MainLayout>, children: [
            {
                path: "/", element: <Home></Home>
            },
            {
                path: "/register", element: <Register></Register>
            },
            {
                path: "/login", element: <Login></Login>
            },
            {
            path:"short-links" , element:<PrivateRouter><ShortLinks></ShortLinks></PrivateRouter>
            } ,
            {
                path:"/reset-password", element:<ResetPassword></ResetPassword>
            } ,
            {
                path: "*", element: <h2 className="text-white text-center text-5xl">Page not found </h2>
            }
        ]
    }
]);

