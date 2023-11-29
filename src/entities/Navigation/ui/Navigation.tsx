import React, { FC } from 'react'

import { Button } from 'shared/ui/Button'

import { Room } from '../model/types'

import css from './navigation.module.scss'

interface Props {
    rooms: Room[]
}

export const Navigation: FC<Props> = ({ rooms }) => {
    return (
        <div className={css.root}>
            <h4 className={css.title}>Rooms</h4>
            <nav>
                {rooms.map(({ id, name }) => (
                    <Button key={id} as="a" to={`/${id}`}>{name}</Button>
                ))}
            </nav>
        </div>
    )
}
