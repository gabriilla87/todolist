import {createBrowserRouter, Navigate} from "react-router-dom";
import {Todolists} from "../components/Todolists/Todolists";
import {ErrorPage} from "../components/ErrorPage/ErrorPage";
import App from "./App";
import {LoginPage} from "../components/LoginPage/LoginPage";

export const router = createBrowserRouter([
        {
            path: "/",
            element: <App/>,
            errorElement: <ErrorPage/>,
            children: [
                {
                    index: true,
                    element: <Navigate to={"/todolist"}/>
                },
                {
                    path: "/todolist",
                    element: <Todolists/>
                },
                {
                    path: "/login",
                    element: <LoginPage/>
                }
            ]
        }
    ], {basename: process.env.NODE_ENV === 'production' ? '/todolist' : '/'}
)