import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CalendarState {
    year: number
    month: number
    currentDay: number
}

const initialState: CalendarState = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    currentDay: new Date().getDate(),
}

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        changeMonth: (state, action: PayloadAction<number>) => {
            let newMonth = state.month + action.payload
            let newYear = state.year

            if (newMonth < 0) {
                newMonth = 11
                newYear -= 1
            } else if (newMonth > 11) {
                newMonth = 0
                newYear += 1
            }
            state.month = newMonth
            state.year = newYear
        },
        setYear: (state, action: PayloadAction<number>) => {
            state.year = action.payload
        },
        setMonth: (state, action: PayloadAction<number>) => {
            state.month = action.payload
        }
    }
})

export const { changeMonth, setYear, setMonth } = calendarSlice.actions
export default calendarSlice.reducer