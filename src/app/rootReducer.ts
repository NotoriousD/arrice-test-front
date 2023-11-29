import { combineReducers } from '@reduxjs/toolkit'

import { chat } from 'widgets/Chat/model/store'

export const rootReducer = combineReducers({
  chat
});

export type RootState = ReturnType<typeof rootReducer>;