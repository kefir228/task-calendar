'use client'

import { useSelector, useDispatch } from "react-redux";
import { FaRegCalendar } from "react-icons/fa6";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { RootState } from "@/store/store";
import { changeMonth } from "@/store/calendarSlice";
import { openModal } from "@/store/modalSlice";
import Modal from "./Modal";
import PickerDate from "./DatePicker";

export default function Header() {

    const { year, month } = useSelector((state: RootState) => state.calendar)
    const { isOpen, type } = useSelector((state: RootState) => state.modal)
    const dispatch = useDispatch()

    const openDatePicker = () => {
        dispatch(openModal({ isOpen: true, type: 'calendar' }))
    }

    const openOtherModal = () => {
        dispatch(openModal({ isOpen: true, type: 'modal' }))
    }

    return (
        <div className="flex justify-between p-4">
            <button className="w-12 h-12 text-4xl flex items-center justify-center text-white bg-blue-500 p-2 rounded-full"
                onClick={openOtherModal}
            >
                +
            </button>
            {isOpen && type === 'modal' && <Modal />}
            <ul className="flex items-center justify-center">
                <li className="flex">
                    <button onClick={() => dispatch(changeMonth(-1))}>
                        <IoIosArrowBack />
                    </button>
                    <p className="w-[120px] text-center">
                        {new Date(year, month).toLocaleString('default', { month: 'long' })} {year}
                    </p>
                    <button onClick={() => dispatch(changeMonth(+1))}>
                        <IoIosArrowForward />
                    </button>
                </li>
                <button className="text-4xl" onClick={openDatePicker}>
                    <FaRegCalendar />
                </button>
                {isOpen && type === 'calendar' && (
                    <div className="absolute mt-2 z-10">
                        <PickerDate />     
                    </div>
                )}
            </ul>
        </div>
    )
}