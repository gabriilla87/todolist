import React, {useState} from 'react';
import './App.css';
import {Wrapper} from "./components/Wrapper/Wrapper";
import {Header} from "./components/Header/Header";
import {Container} from "./components/Container/Container";
import {Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import TaskStatus from "./components/TaskStatus/TaskStatus";
import {Task} from "./components/Task/Task";

function App() {
    const [todolists, setTodolists] = useState<string[]>([])
    // for (let i = 0; i < 30; i++) {
    //     arr.push(i)
    // }

    const addTodolist = (title: string) => {
        setTodolists([...todolists, title])
    }

    return (
        <Wrapper>
            <Header/>
            <Container>
                <AddItemForm addItem={addTodolist}/>
                {todolists?.map(el => {
                    return (
                        <Todolist key={el} todolistNumber={el}>
                            <Task/>
                            <Task/>
                            <Task/>
                            <Task/>
                        </Todolist>
                    )
                })}
            </Container>
        </Wrapper>
    );
}

export default App;
