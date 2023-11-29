import React, { FC } from 'react'
import cn from 'classnames'

import { MessageItem, Message } from 'entities/MessageItem'

import css from './messageList.module.scss'
import { useAppSelector } from 'app/store'
import { selectUserInfo } from 'widgets/Chat/model/store/selectors'

interface Props {
    messages: Message[],
}

export const MessageList: FC<Props> = ({ messages }) => {
    const user = useAppSelector(selectUserInfo)

    console.log(messages);
    return (
        <div className={css.root}>
            {Boolean(user.loading) && <div>Loading</div>}
            {!Boolean(messages.length) && <div className={css.empty}>No messages</div>}
            {messages.map(({ id, username, message }) => {
                const isOwner = username === user.username
                return (
                    <div className={cn(css.row, {
                        [css.rightAlign]: isOwner
                    })} key={id}>
                        <MessageItem
                            username={username}
                            message={message}
                            isOwner={isOwner}
                        />
                    </div>
                )
            })}
        </div>
    )
}
