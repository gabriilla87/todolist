import React, {useEffect, useState} from 'react';
import './App.css';
import {Wrapper} from "../components/Wrapper/Wrapper";
import {Header} from "../components/Header/Header";
import {Container} from "../components/Container/Container";
import {useAppDispatch} from "./store";
import {Outlet} from "react-router-dom";
import {useMeQuery} from "../dal/api/authApi";
import {ResultCode} from "../enums/enums";
import {setIsLoggedIn} from "./appSlice";
import {CircularProgress} from "@mui/material";

function App() {
    const [isInitialized, setIsInitialized] = useState(false)

    const dispatch = useAppDispatch()

    const {data, isLoading} = useMeQuery()

    useEffect(() => {
        if (!isLoading) {
            setIsInitialized(true)
            if (data?.resultCode === ResultCode.SUCCESS) {
                dispatch(setIsLoggedIn({isLoggedIn: true}))
            }
        }
    }, [dispatch, isLoading, data])

    if (!isInitialized) {
        return (
            <div style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
                <CircularProgress/>
            </div>
        );
    }

    return (
        <Wrapper>
            <Header/>
            <Container>
                <Outlet/>
            </Container>
        </Wrapper>
    );
}

export default App;