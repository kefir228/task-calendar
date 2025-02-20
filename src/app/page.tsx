'use client'

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Calendar() {
  const { year, month } = useSelector((state: RootState) => state.calendar)

  const getDaysInMonth = (year: number, month: number) => {
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysArray = []

    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(null)
    }

    for (let day = 1; day < daysInMonth; day++) {
      daysArray.push(day)
    }
    return daysArray
  }
  const days = getDaysInMonth(year, month)

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
      <div className="grid grid-cols-7 gap-1 text-center font-semibold">
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"].map((day) => (
          <div key={day} className="p-2">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((day, index) => (
          <div key={index} className={`p-2 ${day ? "bg-gray-200" : "invisible"} rounded-md`}>
            {day}
          </div>
        ))}
      </div>
    </div>
  )
}
