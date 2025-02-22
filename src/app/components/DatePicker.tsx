'use client'

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { setYear, setMonth } from "@/store/calendarSlice";
import { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "@/store/modalSlice";

export default function PickerDate() {
    const { year, month } = useSelector((state: RootState) => state.calendar)
    const dispatch = useDispatch()

    const closePicker = () => {
        dispatch(openModal({ isOpen: false, type: 'calendar' }))
    }

    const handleDateChange = (date: Date | null) => {
        if (date) {
            dispatch(setYear(date.getFullYear()))
            dispatch(setMonth(date.getMonth()))
        }
    }

    return (
        <div className="flex flex-col absolute mt-4 bg-white border rounded shadow-lg p-2">
            <DatePicker
                selected={new Date(year, month)}
                onChange={handleDateChange}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                inline
            />
            <button className="flex justify-center font-bold" onClick={closePicker}>Закрити</button>
        </div>
    )
}