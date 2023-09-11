import { useForm } from "react-hook-form";
import {useTasks} from '../context/TasksContext'
import {useNavigate, useParams} from 'react-router-dom'
import { useEffect } from "react";
//utilizando libreria para formatear las fechas
//y al enviar a la base de datos pueda entender el formato en que lo enviamos
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const {createTask, getTaskOne, updateTask} = useTasks()
  const params = useParams()

  const navigate = useNavigate()

  const onSubmite = handleSubmit((data) => {

    // if (params.id) {
    //   updateTask(params.id, data);
    // } else {
    //   createTask(data);
    // }
    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    }

    if(params.id){
      updateTask(params.id, dataValid)
    }
    else{
      createTask(dataValid)
    }
    navigate('/tasks')
  });



  useEffect(()=>{
    async function loadTask(){
      if (params.id) {
        const task = await getTaskOne(params.id)
        setValue('title', task.title)
        setValue('description', task.description)
        setValue("date", dayjs(task.date).utc().format('YYYY-MM-DD'))
      }
    }
    loadTask()
  },[])

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSubmite}>
        <input
          type="text"
          placeholder="Title"
          autoFocus
          {...register("title")}
          className="w-full text-white bg-zinc-700 px-4 py-2 rounded-md my-2"
        />

        <textarea
          className="w-full text-white bg-zinc-700 px-4 py-2 rounded-md my-2"
          rows="3"
          placeholder="Description"
          {...register("description")}
        ></textarea>

        <input type="date" {...register('date')} className="w-full text-white bg-zinc-700 px-4 py-2 rounded-md my-2" />

        <button className="bg-indigo-500 px-3 py-2 rounded-md">Save</button>
      </form>
    </div>
  );
}

export default TaskFormPage;
