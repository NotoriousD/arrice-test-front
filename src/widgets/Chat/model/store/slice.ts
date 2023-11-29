import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Message } from 'entities/MessageItem'
import { Room } from 'entities/Navigation'

const CHAT_FEATURE_KEY = 'chat'

export interface ChatState {
    username: string | null
    roomId: string | null
    rooms: Room[]
    messages: Message[]
    loading: boolean
}

const initialState: ChatState = {
    username: null,
    roomId: null,
    rooms: [],
    messages: [],
    loading: false
}

const chatSlice = createSlice({
    name: CHAT_FEATURE_KEY,
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        joinToRoom: (state, action: PayloadAction<string>) => {
            state.roomId = action.payload
            console.log(action.payload);
        },
        leaveFromRoom: (state, action: PayloadAction<string>) => {
            state = initialState
        },
        getNewMessage: (state, action: PayloadAction<Message>) => {
            state.messages = [...state.messages, action.payload]
        },
        setLastMessages: (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload
            state.loading = false
        },
        setRooms: (state, action: PayloadAction<Room[]>) => {
            console.log(action.payload);
            state.rooms = action.payload
        },
        getRooms: (state) => { console.log('object'); },
        sendMessage: (state, action: PayloadAction<Message>) => {
            state.username = action.payload.username
        },
        changeRoom: (state, action: PayloadAction<string>) => {
            state.roomId = action.payload
        }
    },
})

export const {
    setLoading,
    joinToRoom,
    leaveFromRoom,
    getNewMessage,
    setLastMessages,
    sendMessage,
    setRooms,
    getRooms,
    changeRoom
} = chatSlice.actions

export const chat = chatSlice.reducer
