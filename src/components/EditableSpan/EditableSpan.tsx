import React, { ChangeEvent, useState, KeyboardEvent, MouseEvent } from "react";
import s from "./EditableSpan.module.css";
import { CRUDButtons } from "../CRUDButtons/CRUDButtons";

type Props = {
  isEditMode: boolean
  title: string
  isDone?: boolean
  isDisabled: boolean
  changeItemTitle: (title: string) => void
  removeItem: () => void
  changeItemEditMode: (isEditMode: boolean) => void
}

export const EditableSpan = (props: Props) => {
  const {
    isEditMode,
    title,
    changeItemTitle,
    isDone,
    changeItemEditMode,
    removeItem,
    isDisabled
  } = props;

  const [inputValue, setInputValue] = useState<string>(title);

  const changeInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const changeItemTitleHandler = () => {
    changeItemTitle(inputValue);
    changeItemEditMode(false);
  };

  const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Escape") {
      changeItemTitleHandler();
    }
  };

  const onClickHandler = (e: MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={s.editableSpanWrapper}>
      {
        isEditMode
          ?
          <input
            type="text"
            value={inputValue}
            onChange={changeInputValueHandler}
            onKeyUp={onEnterPressHandler}
            autoFocus
            className={s.input}
            onClick={onClickHandler}
            onBlur={changeItemTitleHandler}
          />
          :
          <span className={`${s.itemText} ${isDone ? s.isDone + " " + s.strikethrough : ""}`}>
            {title}
            <CRUDButtons
              removeItem={removeItem}
              changeItemEditMode={changeItemEditMode}
              isDisabled={isDisabled}
            />
          </span>
      }
    </div>
  );
};