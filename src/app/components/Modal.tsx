'use client'

import { RxCross2 } from "react-icons/rx";
import { useForm } from 'react-hook-form'
import { openModal } from "@/store/modalSlice";
import { useDispatch } from "react-redux";

interface FormData {
    title: string
    description: string
    date: string
    time: string
}

export default function Modal() {
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormData>()

    const onSumbit = (data: FormData) => {
        reset()
        console.log('Form Data', data);
    }

    const closeModal = () => {
        dispatch(openModal({ isOpen: false, type: 'modal' }))
    }

    return (
        <form onSubmit={handleSubmit(onSumbit)}
            className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
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
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    placeholder="Введіть назву"
                />
            </div>

            <div>
                <textarea
                    {...register('description', {
                        required: "Опис є обов'язковим",
                        minLength: { value: 10, message: "Опис має містити мінімум 10 символів" }
                    })}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    placeholder="Введіть опис..."
                    rows={4}
                />
            </div>

            <div className="flex items-center justify-between">
                <input
                    type="date"
                    {...register("date", {
                        required: "Дата є обов'язковою",
                        validate: (value) => (new Date(value) >= new Date() ? true : "Дата не може бути в минулому"),
                    })}
                    className="p-2 border border-gray-300 rounded mt-1"
                />
                {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}

                <input
                    type="time"
                    {...register("time", {
                        required: "Час є обов'язковим",
                        validate: (value) => (value ? true : "Будь ласка, оберіть час"),
                    })}
                    className=" p-2 border border-gray-300 rounded mt-1"
                />
                {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
            </div>

            <button type="submit">
                SAVE
            </button>
        </form>
    )
}