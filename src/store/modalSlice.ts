import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
import { id } from "date-fns/locale";

interface FormData {
    id:string
    title: string
    description: string
    date: string
    time: string
}

interface modalState {
    isOpen: boolean
    type: 'calendar' | 'modal'
    tasks: FormData[]
    currentTask: FormData | null
}

const getSavedTask = (): FormData[] => {
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem('tasks') || '[]')
    }
    return []
}

const initialState: modalState = {
    isOpen: false,
    type: 'modal',
    tasks: getSavedTask(),
    currentTask: null
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<{ isOpen: boolean, type: 'calendar' | 'modal', task?: FormData }>) => {
            state.isOpen = action.payload.isOpen
            state.type = action.payload.type
            state.currentTask = action.payload.task || null
        },
        addTask: (state, action: PayloadAction<FormData>) => {
            const newTask = {...action.payload, id:nanoid()}
            state.tasks.push(newTask)
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        },
        setTasks: (state) => {
            state.tasks = getSavedTask()
        },
        setCurrentTask: (state, action: PayloadAction<FormData | null>) => {
            state.currentTask = action.payload
        },
        updateTask: (state, action: PayloadAction<FormData>) => {
            state.tasks = state.tasks.map((task) =>
                task.id === action.payload.id ? action.payload : task
            )
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        },
        deleteTask: (state, action: PayloadAction<FormData>) => {
            state.tasks = state.tasks.filter((task) =>
                !(task.title === action.payload.title &&
                    task.description === action.payload.description &&
                    task.date === action.payload.date &&
                    task.time === action.payload.time)
            )
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        }
    }
})

export const { openModal, addTask, setTasks, setCurrentTask, updateTask, deleteTask } = modalSlice.actions
export default modalSlice.reducer
