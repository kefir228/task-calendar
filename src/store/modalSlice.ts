import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface modalState {
    isOpen: boolean
    type: 'calendar' | 'modal'
}

const initialState: modalState = {
    isOpen: false,
    type: 'modal'
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<{isOpen: boolean, type: 'calendar' | 'modal'}>) => {
            state.isOpen = action.payload.isOpen
            state.type = action.payload.type
        }
    }
})

export const { openModal } = modalSlice.actions
export default modalSlice.reducer
