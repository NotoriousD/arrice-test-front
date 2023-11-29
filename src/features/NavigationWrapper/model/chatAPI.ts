import { AxiosResponse } from 'axios'

import { Room } from 'entities/Navigation'

import { httpClient } from 'shared/api/httpClient'

interface FetchRoomsResponse {
    rooms: Room[]
}

export const chatAPI = {
    async fetchRooms() {
        try {
            const response = await httpClient.get('/rooms')

            return response as AxiosResponse<FetchRoomsResponse>
        } catch(e) {
            console.log(e)
        }
    }
}