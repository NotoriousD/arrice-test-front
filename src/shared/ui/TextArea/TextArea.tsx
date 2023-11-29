import React, { FC, TextareaHTMLAttributes } from 'react'

import css from './textArea.module.scss'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> { }

export const TextArea: FC<Props> = (props) => {
    return (
        <textarea className={css.root} {...props} rows={1} />
    )
}
