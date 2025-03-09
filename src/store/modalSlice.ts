import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";

interface FormData {
    id: string
    title: string
    description: string
    date: string
    time: string
    createdAt: string
    updatedAt: string
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
        addTask: (state, action: PayloadAction<Omit<FormData, 'id' | 'createdAt' | 'updatedAt'>>) => {
            const newTask: FormData = {
                ...action.payload,
                id: nanoid(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
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
                task.id === action.payload.id && JSON.stringify(task) !== JSON.stringify(action.payload)
                    ? { ...action.payload, updatedAt: new Date().toISOString() } : task
            )
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload)
            localStorage.setItem('tasks', JSON.stringify(state.tasks))
        }
    }
})

export const { openModal, addTask, setTasks, setCurrentTask, updateTask, deleteTask } = modalSlice.actions
export default modalSlice.reducer
