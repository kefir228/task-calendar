'use client'

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { getDaysInMonth } from "@/utils/DaysInMonth";
import { useClient } from "@/utils/useClient";
import { useLoadTasks } from "@/utils/useLoadTasks";
import { openModal, setCurrentTask } from "@/store/modalSlice";

export default function Calendar() {
  const { year, month, currentDay } = useSelector((state: RootState) => state.calendar)
  const tasks = useSelector((state: RootState) => state.modal.tasks)
  const dispatch = useDispatch()

  useLoadTasks()

  const days = getDaysInMonth(year, month)

  if (!useClient()) return null

  return (
    <div className="h-screen flex flex-col max-w-full mx-auto p-4 border rounded-lg shadow-md" >
      <div className="grid grid-cols-7 gap-1 text-center flex-grow font-semibold">
        {days.map((day, index) => {
          const date = day ? day : ''
          const weekDay = day ? ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][new Date(year, month, day).getDay()] : "";
          const dayTasks = tasks
            .filter(task => {
              const taskDate = new Date(task.date).getDate()
              const taskMonth = new Date(task.date).getMonth()
              return taskDate === day && taskMonth === month
            })
            .sort((a, b) => {
              const timeA = a.time ? parseInt(a.time.replace(':', ''), 10) : 0
              const timeB = b.time ? parseInt(b.time.replace(':', ''), 10) : 0
              return timeA - timeB
            })
          return (
            <div
              key={index}
              className={`relative p-4 flex flex-col flex-grow rounded-md  
                          ${day ? "bg-white" : "bg-gray-400"} 
                          ${day === currentDay ? "!bg-green-300 text-white font-bold" : ""}`}>
              <div className="absolute top-1 left-2 text-xs opacity-70">{weekDay}</div>
              <div className="absolute top-1 right-2 text-sm font-bold">{date}</div>

              {dayTasks.map((task, i) => (
                <div
                  key={i}
                  className="bg-gray-500 p-1 rounded text-xs mt-1 truncate cursor-pointer"
                  title={task.title}
                  onClick={() => {
                    dispatch(openModal({ isOpen: true, type: 'modal' }))
                    dispatch(setCurrentTask(task))
                  }}
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
