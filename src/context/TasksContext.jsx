/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from "react";
import {createTaskRequest, getTasksRequest, deleteTaskRequest, getTaskRequest, updateTaskRequest} from '../api/tasks'

const TaskContext = createContext();

export const useTasks = ()=>{
    const context = useContext(TaskContext)

    if(!context){
        throw new Error("useTasks must be used within a taskprovider")
    }

    return context;
}

export function TaskProvider({children}){
    const [tasks, setTasks] = useState([])
    
    const createTask = async (task)=>{
        const res = await createTaskRequest(task)
        console.log(res);
    }

    const getTask = async()=>{
        const res = await getTasksRequest()
        //console.log(res);
        setTasks(res)
    }

    const deletetask = async(id)=>{
        try {
            const res = await deleteTaskRequest(id)
            //if (res.status === 204 ) setTasks(tasks.filter(task => task._id !== id)) 
        } catch (error) {
            console.log(error);
        }
    }

    const getTaskOne = async(id)=>{
        try {
            const res = await getTaskRequest(id)
//        console.log(res);
            return res
        } catch (error) {
            console.log(error);
        }
    }

    const updateTask = async(id, task)=>{
        try {
            await updateTaskRequest(id,task)
        } catch (error) {
            console.log(error);
        }
    }


    return(
        <TaskContext.Provider value={{tasks, createTask, getTask, deletetask, getTaskOne, updateTask}}>
            {children}
        </TaskContext.Provider>
    )
}