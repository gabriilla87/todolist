import React, {MouseEvent} from 'react';
import s from './Button.module.css'
import spriteIcon from '../../assets/svg/sprite.svg'

type Props = {
    disabled: boolean
    svgProps: SvgProps
}

export type SvgProps = {
    id: string
    viewBox: string
    onClick: () => void
}

export const Button = ({ disabled, svgProps }: Props) => {
    const {id, viewBox, onClick} = svgProps

    const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        onClick()
    }

    return (
        <button onClick={onClickHandler} className={s.button} disabled={disabled}>
            {/*<img src={imgSrc} alt={"Button"} className={s.icon}/>*/}
            <svg
                height={'16px'}
                width={'16px'}
                viewBox={viewBox}
                fill={"none"}
                xmlns="http://www.w3.org/2000/svg"
                className={`${s.icon} ${disabled ? s.disabledIcon : ""}`}
            >
                <use xlinkHref={`${spriteIcon}#${id}`}/>
            </svg>
        </button>
    )
};
