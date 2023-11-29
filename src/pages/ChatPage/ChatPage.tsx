import React, { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useAppDispatch } from 'app/store'

import { Chat } from 'widgets/Chat'
import { joinToRoom, leaveFromRoom } from 'widgets/Chat/model/store'

interface Props { }

export const ChatPage: FC<Props> = () => {
    const { room } = useParams<string>()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (room) dispatch(joinToRoom(room))

        return () => {
            if (room) dispatch(leaveFromRoom(room))
        }
    }, [room, dispatch])

    return (
        <Chat roomId={room || ''} />
    )
}
