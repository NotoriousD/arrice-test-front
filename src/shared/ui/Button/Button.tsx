import React, { PropsWithChildren, ElementType, ComponentProps, memo } from "react"
import { NavLink } from 'react-router-dom'
import cn from 'classnames'

import css from './button.module.scss'

export const ButtonDefaultType = 'button' as const
export type ButtonDefaultAsType = typeof ButtonDefaultType

export type ButtonOwnProps<E extends ElementType> = {
    as?: E
}

export type ButtonProps<E extends ElementType> = PropsWithChildren<ButtonOwnProps<E>> &
    Omit<ComponentProps<E>, keyof ButtonOwnProps<E>>

export const Button = memo(<E extends React.ElementType = ButtonDefaultAsType>({
    children,
    as,
    to,
    className,
    href,
    ...otherProps
}: ButtonProps<E>) => {
    const Component = as === 'a' ? NavLink : ButtonDefaultType
    return (
        <Component
            to={to}
            className={cn(css.root, className)}
            {...otherProps}
        >
            {children}
        </Component>
    )
})
