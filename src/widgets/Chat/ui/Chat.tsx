import React, { FC } from 'react'

import { MessageList } from 'features/MessageList'

import css from './chat.module.scss'
import { ChatControl, Inputs } from 'features/ChatControl'
import { useAppDispatch, useAppSelector } from 'app/store'
import { selectMessageList } from '../model/store/selectors'
import { sendMessage } from '../model/store'
import { Message } from 'entities/MessageItem'

interface Props {
    roomId: string
}

export const Chat: FC<Props> = ({ roomId }) => {
    const messages = useAppSelector(selectMessageList)
    const dispatch = useAppDispatch()

    const handleSubmit = (data: Inputs) => {
        dispatch(sendMessage({
            ...data,
            room: roomId,
        } as Message))
    }

    return (
        <div className={css.root}>
            <div className={css.messages}>
                <MessageList messages={messages} />
            </div>
            <div className={css.controls}>
                <ChatControl onSubmit={handleSubmit} />
            </div>
        </div>
    )
}
