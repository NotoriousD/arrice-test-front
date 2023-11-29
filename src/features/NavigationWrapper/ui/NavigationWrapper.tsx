import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'app/store'

import { getRooms } from 'widgets/Chat/model/store'
import { selectRoomList } from 'widgets/Chat/model/store/selectors'

import { Navigation } from 'entities/Navigation'

import css from './navigationWrapper.module.scss'

export const NavigationWrapper = () => {
    const rooms = useAppSelector(selectRoomList)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!rooms.length) dispatch(getRooms())
    }, [dispatch, rooms])

    return (
        <div className={css.root}>
            {rooms && <Navigation rooms={rooms} />}
            <div className={css.content}>
                <Outlet />
            </div>
        </div>
    )
}
