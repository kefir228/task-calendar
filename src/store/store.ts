import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from '@/store/calendarSlice'
import modalReducer from '@/store/modalSlice'

export const store = configureStore({
    reducer: {
        calendar: calendarReducer,
        modal: modalReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch