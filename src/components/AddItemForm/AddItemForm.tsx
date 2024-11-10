import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "./AddItemForm.module.css"

type Props = {
    addItem: (title: string) => void
    placeholder: string
}

export const AddItemForm = ({addItem, placeholder}: Props) => {
    const [inputValue, setInputValue] = useState("")

    const changeInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    }

    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") addItemHandler()
    }

    const addItemHandler = () => {
        addItem(inputValue)
        setInputValue('')
    }

    return (
        <div className={s.addItemWrapper}>
            <input
                value={inputValue}
                onChange={changeInputValueHandler}
                onKeyUp={onEnterPressHandler}
                className={s.input}
                placeholder={placeholder}
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