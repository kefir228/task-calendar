'use client'

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Calendar() {
  const { year, month, currentDay } = useSelector((state: RootState) => state.calendar)

  const getDaysInMonth = (year: number, month: number) => {
    const firstDayOfMonth = new Date(year, month, 0).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysArray = []

    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(null)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(day)
    }

    const remainingDays = daysArray.length % 7;
    if (remainingDays > 0) {
      for (let i = 0; i < 7 - remainingDays; i++) {
        daysArray.push(null);
      }
    }

    return daysArray
  }
  const days = getDaysInMonth(year, month)

  return (
    <div className="h-screen flex flex-col max-w-full mx-auto p-4 border rounded-lg shadow-md">
      <div className="grid grid-cols-7 gap-1 text-center flex-grow font-semibold">
        {days.map((day, index) => {
          const date = day ? day : ''
          const weekDay = day ? ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][new Date(year, month, day).getDay()] : "";
          
          return (
            <div 
              key={index} 
              className={`relative p-4 flex flex-col flex-grow justify-between rounded-md  
                          ${day ? "bg-white" : "bg-gray-400"} 
                          ${day === currentDay ? "!bg-green-300 text-white font-bold" : ""}`}>
              <div className="absolute top-1 left-2 text-xs opacity-70">{weekDay}</div>
              <div className="absolute top-1 right-2 text-sm font-bold">{date}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
