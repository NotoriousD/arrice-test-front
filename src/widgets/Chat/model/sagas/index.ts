import io, { Socket } from 'socket.io-client'
import { eventChannel } from 'redux-saga'
import { fork, take, call, put, cancel } from 'redux-saga/effects'

import {
    joinToRoom,
    leaveFromRoom,
    getNewMessage,
    setLoading,
    setLastMessages,
    sendMessage,
    setRooms,
    getRooms,
} from '../store/slice'
import { chatAPI } from 'features/NavigationWrapper/model/chatAPI'

function connect() {
    const socket: Socket = io(process.env.REACT_APP_API_URL as string, {
        path: '/socket',
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5
    })
    return new Promise(resolve => {
        socket.on('connect', () => {
            resolve(socket)
        })
    })
}

function subscribe(socket: Socket) {
    return eventChannel(emit => {
        socket.on('messages_last', (messages) => {
            emit(setLastMessages(messages))
        })
        socket.on('receive_message', (message) => {
            emit(getNewMessage(message))
        })
        socket.on('disconnect', e => {})
        return () => { }
    })
}

function* read(socket: Socket): any {
    const channel = yield call(subscribe, socket)
    while (true) {
        let action = yield take(channel)
        yield put(action)
    }
}

function* write(socket: Socket) {
    while (true) {
        const { payload } = yield take(`${sendMessage}`)
        socket.emit('send_message', payload)
    }
}

function* getRoomList(): any {
    while(true) {
        yield take(`${getRooms}`)
        const response = yield call(chatAPI.fetchRooms)
        yield put(setRooms(response.data))
    }
}

function* handleIO(socket: Socket) {
    yield fork(read, socket)
    yield fork(write, socket)
}

function* flow(): any {
    while (true) {
        let { payload } = yield take(`${joinToRoom}`)
        const socket = yield call(connect)
        yield put(setLoading(true))
        socket.emit('room_join', payload)

        const task = yield fork(handleIO, socket)

        const action = yield take(`${leaveFromRoom}`)
        yield cancel(task)
        socket.emit('room_leave', action.payload)
        yield call([socket, socket.disconnect])
    }
}

export default function* rootSaga() {
    yield fork(flow)
    yield fork(getRoomList)
}