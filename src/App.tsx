import React, {useEffect} from 'react';
import './App.css';
import {Wrapper} from "./components/Wrapper/Wrapper";
import {Header} from "./components/Header/Header";
import {Container} from "./components/Container/Container";
import {Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {RootState, useAppDispatch} from "./bll/store";
import {addTodolist, DomainTodolist, fetchTodolists} from "./bll/reducers/todolistReducer";
import {v1} from "uuid";
import {useSelector} from "react-redux";

function App() {
    // for (let i = 0; i < 30; i++) {
    //     arr.push(i)
    // }

    const dispatch = useAppDispatch()
    const todolists = useSelector<RootState, DomainTodolist[]>(state => state.todolists)

    const addTodolistHandler = (title: string) => {
        dispatch(addTodolist({title, id: v1()}))
    }

    useEffect(() => {
        dispatch(fetchTodolists())
    }, [dispatch]);

    return (
        <Wrapper>
            <Header/>
            <Container>
                <AddItemForm addItem={addTodolistHandler} placeholder={"Todolist title"}/>
                {todolists?.map(tl => <Todolist key={tl.id} todolist={tl}/>)}
            </Container>
        </Wrapper>
    );
}

export default App;
