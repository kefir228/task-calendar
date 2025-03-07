import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTasks } from "@/store/modalSlice";

export const useLoadTasks = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setTasks())
    }, [dispatch])
}