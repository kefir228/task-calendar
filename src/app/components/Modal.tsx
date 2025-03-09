'use client'

import { RxCross2 } from "react-icons/rx";
import { FaTrashAlt } from "react-icons/fa";
import { useForm } from 'react-hook-form'
import { openModal, addTask, updateTask, deleteTask } from "@/store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";

interface FormData {
    title: string
    description: string
    date: string
    time: string
}

export default function Modal() {
    const dispatch = useDispatch()
    const { isOpen, currentTask } = useSelector((state: RootState) => state.modal)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>()

    useEffect(() => {
        if (currentTask) {
            reset({
                title: currentTask.title,
                description: currentTask.description,
                date: currentTask.date,
                time: currentTask.time
            })
        } else {
            reset()
        }
    }, [currentTask])

    const onSumbit = (data: FormData) => {
        if (currentTask) {
            dispatch(updateTask({ ...currentTask, ...data, updatedAt: new Date().toISOString() }))
        } else {
            dispatch(addTask(data))
        }
        closeModal()
    }

    const closeModal = () => {
        dispatch(openModal({ isOpen: false, type: 'modal' }))
        reset()
    }

    const handleDelete = () => {
        if (currentTask) {
            dispatch(deleteTask(currentTask.id));
            closeModal();
        }
    };

    return (
        isOpen && (
            <div className="flex fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
                <form onSubmit={handleSubmit(onSumbit)}
                    className="max-w-md w-full mx-auto p-6 bg-white shadow-md rounded-lg"
                >
                    <div className="mb-4 flex items-center justify-between">
                        <label className="block font-semibold">
                            {currentTask ? 'Редагувати подію' : 'Додати нову подію'}
                        </label>
                        <button onClick={closeModal}>
                            <RxCross2 />
                        </button>
                    </div>

                    {currentTask && (
                        <div className="mt-4 text-sm text-gray-600">
                            <p>Створено: {new Date(currentTask.createdAt).toLocaleString()}</p>
                            {currentTask.updatedAt !== currentTask.createdAt && (
                                <p>Оновлено: {new Date(currentTask.updatedAt).toLocaleString()}</p>
                            )}
                        </div>
                    )}

                    <div>
                        <input
                            {...register('title', { required: "Назва обов'язкова" })}
                            className="w-full p-2 border-b border-gray-300 mt-1"
                            placeholder="Введіть назву"
                        />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>

                    <div>
                        <textarea
                            {...register('description', {
                                required: "Опис є обов'язковим",
                                minLength: { value: 10, message: "Опис має містити мінімум 10 символів" }
                            })}
                            className="w-full p-2 border-b border-gray-300 mt-1"
                            placeholder="Введіть опис..."
                            rows={4}
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    <div className="flex items-center justify-between flex-wrap">
                        <input
                            type="date"
                            {...register("date", {
                                required: "Дата є обов'язковою",
                                validate: (value) => (new Date(value) >= new Date() ? true : "Дата не може бути в минулому"),
                            })}
                            className="p-2 border-b border-gray-300 mt-1"
                        />
                        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}

                        <input
                            type="time"
                            {...register("time", {
                                required: "Час є обов'язковим",
                                validate: (value) => (value ? true : "Будь ласка, оберіть час"),
                            })}
                            className=" p-2 border-b border-gray-300 mt-1"
                        />
                        {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
                    </div>

                    <div className="flex justify-end mt-4 gap-1">
                        {currentTask && (
                            <button type="button" className="bg-red-500 text-white p-2 rounded" onClick={handleDelete}>
                                <FaTrashAlt />
                            </button>
                        )}
                        <button type="submit" className="bg-gray-500 text-white p-2 rounded">
                            {currentTask ? "Оновити" : "Зберегти"}
                        </button>
                    </div>

                </form>
            </div >
        )
    )
}