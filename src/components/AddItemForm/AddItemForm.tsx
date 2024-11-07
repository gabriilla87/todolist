import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "./AddItemForm.module.css"

type Props = {
    addItem: (title: string) => void
}

export const AddItemForm = ({addItem}: Props) => {
    const [inputValue, setInputValue] = useState("")

    const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") addItemHandler()
    }

    const addItemHandler = () => {
        addItem(inputValue)
        setInputValue('')
    }

    return (
        <div className={s.addItemWrapper}>
            <input
                value={inputValue}
                onChange={changeInputValue}
                onKeyUp={onEnterPressHandler}
                className={s.input}
                placeholder={"Todolist title"}
            />
            <button
                onClick={addItemHandler}
                className={s.button}
            >
                +
            </button>
        </div>
    );
};