import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'app/rootReducer';

const getChatState = (store: RootState) => store.chat;

export const selectChatData = createSelector(getChatState, (s) => s);

export const selectMessageList = createSelector(getChatState, (s) => s.messages)

export const selectRoomList = createSelector(getChatState, (s) => s.rooms)

export const selectUserInfo = createSelector(getChatState, (s) => s)
