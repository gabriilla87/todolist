import { createBrowserRouter, Navigate } from "react-router-dom";
import {TodolistsList} from "../components/TodolistsList/TodolistsList";
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
                    element: <TodolistsList/>
                },
                {
                    path: "/login",
                    element: <LoginPage/>
                }
            ]
        }
    ], {basename: process.env.REACT_APP_NODE_ENV === 'production' ? '/todolist' : '/'}
)