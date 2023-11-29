import React, { InputHTMLAttributes, FC, memo } from 'react'

import css from './input.module.scss'

interface Props extends InputHTMLAttributes<HTMLInputElement> { }

export const Input: FC<Props> = memo((props) => {
    return (
        <input className={css.root} {...props} />
    )
})
