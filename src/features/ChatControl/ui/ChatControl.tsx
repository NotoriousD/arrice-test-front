import React, { FC } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Button } from 'shared/ui/Button'
import { Input } from 'shared/ui/Input'
import { TextArea } from 'shared/ui/TextArea'
import { ErrorMessage } from 'shared/ui/ErrorMessage'

import { schema } from '../model/validation'

import css from './chatControl.module.scss'

export interface Inputs {
    username: string
    message: string
}

interface Props {
    onSubmit: (data: Inputs) => void
}

export const ChatControl: FC<Props> = ({ onSubmit }) => {
    const { handleSubmit, formState: { errors }, control } = useForm<Inputs>({
        resolver: yupResolver(schema)
    })

    const handleSendMessage: SubmitHandler<Inputs> = (data) => onSubmit(data)

    return (
        <div className={css.root}>
            <form onSubmit={handleSubmit(handleSendMessage)}>
                <div className={css.row}>
                    <div className={css.col}>
                        {Boolean(errors?.username) && errors.username?.message && <ErrorMessage message={errors?.username?.message} />}
                        <Controller
                            name="username"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    placeholder='Username'
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className={css.col}>
                        {Boolean(errors?.message) && errors.message?.message && <ErrorMessage message={errors?.message?.message} />}
                        <Controller
                            name="message"
                            control={control}
                            render={({ field }) => (
                                <TextArea
                                    placeholder='Message'
                                    {...field}
                                />
                            )}
                        />
                    </div>
                    <div className={css.col}>
                        <Button type="submit">
                            Send
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
