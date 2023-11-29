import React, { FC } from 'react'

import css from './errorMessage.module.scss'

interface Props {
    message: string
}

export const ErrorMessage: FC<Props> = ({ message }) => {
    return (
        <div className={css.root}>{message}</div>
    )
}
