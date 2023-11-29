import React, { FC } from 'react'
import cn from 'classnames'

import { Message } from '../model/types'

import css from './messageItem.module.scss'

type MessageType = Omit<Message, 'room' | 'id'>

interface Props extends MessageType {
    isOwner: boolean
}

export const MessageItem: FC<Props> = ({
    username,
    message,
    isOwner
}) => {
    return (
        <div className={cn(css.root, {
            [css.owner]: isOwner
        })}>
            <div className={css.username}>{username}</div>
            <div className={css.message}>{message}</div>
        </div>
    )
}
