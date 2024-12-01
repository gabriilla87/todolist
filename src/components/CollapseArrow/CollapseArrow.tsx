import React from 'react';
import s from './CollapseArrow.module.css'
import sprite from "../../assets/svg/sprite.svg";

type Props = {
    isOpen: boolean
}

export const CollapseArrow = ({isOpen}: Props) => {
    return (
      <div className={s.collapseArrowWrapper}>
        <svg
          viewBox={"-4.5 0 19 19"}
          height={"18px"}
          width={"18px"}
          className={`${s.arrow} ${isOpen ? s.open : ""}`}
          role="presentation"
        >
          <use xlinkHref={`${sprite}#chevronRight`} />
        </svg>
      </div>
    );
};