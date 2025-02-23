import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormData {
    title: string
    description: string
    date: string
    time: string
}

interface modalState {
    isOpen: boolean
    type: 'calendar' | 'modal'
    tasks: FormData[]
}

const getSavedTask = ():FormData[] => {
    if(typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem('task')||'[]')
    }
    return []
}

const initialState: modalState = {
    isOpen: false,
    type: 'modal',
    tasks: getSavedTask()
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<{ isOpen: boolean, type: 'calendar' | 'modal' }>) => {
            state.isOpen = action.payload.isOpen
            state.type = action.payload.type
        },
        addTask: (state, action: PayloadAction<FormData>) => {
            state.tasks.push(action.payload)
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        }
    }
})

export const { openModal, addTask } = modalSlice.actions
export default modalSlice.reducer
