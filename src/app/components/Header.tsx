'use client'

import { useSelector, useDispatch } from "react-redux";
import { FaRegCalendar } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { RootState } from "@/store/store";
import { changeMonth } from "@/store/calendarSlice";

export default function Header() {

    const { year, month } = useSelector((state: RootState) => state.calendar)
    const dispatch = useDispatch()

    return (
        <div className="flex justify-between">
            <button className="w-12 h-12 text-4xl flex items-center justify-center text-white bg-blue-500 p-2 rounded-full">+</button>
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
                <button className="text-4xl">
                    <FaRegCalendar />
                </button>
            </ul>
        </div>
    )
}