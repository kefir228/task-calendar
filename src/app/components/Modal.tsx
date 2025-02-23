'use client'

import { RxCross2 } from "react-icons/rx";
import { useForm } from 'react-hook-form'
import { openModal, addTask } from "@/store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";


interface FormData {
    title: string
    description: string
    date: string
    time: string
}

export default function Modal() {
    const dispatch = useDispatch()
    const { isOpen } = useSelector((state: RootState) => state.modal)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormData>()

    const onSumbit = (data: FormData) => {
        dispatch(addTask(data))
        reset()
        closeModal()
        console.log('Form Data', data);
    }

    const closeModal = () => {
        dispatch(openModal({ isOpen: false, type: 'modal' }))
    }

    return (
        isOpen && (
            <div className="flex fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
                <form onSubmit={handleSubmit(onSumbit)}
                    className="max-w-md w-full mx-auto p-6 bg-white shadow-md rounded-lg"
                >
                    <div className="mb-4 flex items-center justify-between">
                        <label className="block font-semibold">Додати нову подію</label>
                        <button onClick={closeModal}>
                            <RxCross2 />
                        </button>
                    </div>

                    <div>
                        <input
                            {...register('title', { required: "Назва обов'язкова" })}
                            className="w-full p-2 border-b border-gray-300 mt-1"
                            placeholder="Введіть назву"
                        />
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

                    <button type="submit" className="bg-blue-500 p-1 rounded mt-2">
                        SAVE
                    </button>
                </form>
            </div >
        )
    )
}