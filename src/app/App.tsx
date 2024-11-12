import React from 'react';
import './App.css';
import {Wrapper} from "../components/Wrapper/Wrapper";
import {Header} from "../components/Header/Header";
import {Container} from "../components/Container/Container";
import {Todolist} from "../components/Todolist/Todolist";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {useAppDispatch} from "../bll/store";
import {todolistsApi, useAddTodolistMutation, useGetTodolistsQuery} from "../dal/api/todolistsApi";

function App() {

    const dispatch = useAppDispatch()
    // const todolists = useSelector<RootState, DomainTodolist[]>(state => state.todolists)

    const {data: todolists} = useGetTodolistsQuery()
    const [addTodolist] = useAddTodolistMutation()

    const addTodolistHandler = (title: string) => {
        addTodolist(title)
    }

    const changeTodolistEditMode = ({todolistId, isEditMode}: { todolistId: string, isEditMode: boolean }) => {
        if (!todolists) return;
        const updatedTodolists = todolists.map(tl => tl.id === todolistId ? {...tl, isEditMode: isEditMode} : tl);
        dispatch(todolistsApi.util.upsertQueryData('getTodolists', undefined, updatedTodolists));
    }

    // useEffect(() => {
    //     dispatch(fetchTodolists())
    // }, [dispatch]);

    return (
        <Wrapper>
            <Header/>
            <Container>
                <AddItemForm addItem={addTodolistHandler} placeholder={"Todolist title"}/>
                {todolists?.map(tl => {
                    return (
                        <Todolist
                            key={tl.id}
                            todolist={tl}
                            changeTodolistEditMode={changeTodolistEditMode}
                        />
                    )
                })}
            </Container>
        </Wrapper>
    );
}

export default App;
