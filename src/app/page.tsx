'use client'

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { getDaysInMonth } from "@/utils/DaysInMonth";
import { useClient } from "@/utils/useClient";
import { useLoadTasks } from "@/utils/useLoadTasks";

export default function Calendar() {
  const { year, month, currentDay } = useSelector((state: RootState) => state.calendar)
  const tasks = useSelector((state: RootState) => state.modal.tasks)

  useLoadTasks()

  const days = getDaysInMonth(year, month)

  if (!useClient()) return null
  
  return (
    <div className="h-screen flex flex-col max-w-full mx-auto p-4 border rounded-lg shadow-md">
      <div className="grid grid-cols-7 gap-1 text-center flex-grow font-semibold">
        {days.map((day, index) => {
          const date = day ? day : ''
          const weekDay = day ? ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][new Date(year, month, day).getDay()] : "";
          const dayTasks = tasks.filter(task => {
            const taskDate = new Date(task.date).getDate()
            const taskMonth = new Date(task.date).getMonth()
            return taskDate === day && taskMonth === month
          })

          return (
            <div
              key={index}
              className={`relative p-4 flex flex-col flex-grow justify-between rounded-md  
                          ${day ? "bg-white" : "bg-gray-400"} 
                          ${day === currentDay ? "!bg-green-300 text-white font-bold" : ""}`}>
              <div className="absolute top-1 left-2 text-xs opacity-70">{weekDay}</div>
              <div className="absolute top-1 right-2 text-sm font-bold">{date}</div>

              {dayTasks.map((task, i) => (
                <div
                  key={i}
                  className="bg-gray-500 p-1 rounded text-xs mt-1 truncate"
                  title={task.title}
                >
                  {task.title}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
