/* eslint-disable react-hooks/rules-of-hooks */
import { useTasks } from "../context/TasksContext"
import {Link} from 'react-router-dom'

import days from 'dayjs'
import utc from 'dayjs/plugin/utc'

export default function TaskCard({task}) {
    const {deletetask} = useTasks();
  return (
    <div>
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
              <header className="flex justify-between">
              <p className="text-2xl font-bold" >Title: <br /> {task.title}</p>
              <div className="flex gap-x-2 items-center">
                <button className="" onClick={()=>deletetask(task._id)}>delete</button>
                <Link to={`/tasks/${task._id}`} >edit</Link>
              </div>
              </header>
              <p className="text-slate-300">Description: <br />{task.description}</p>
              {/* esta forma de utilizar es para que formatee de manera basica la fecha y utilice el formato 
              de fecha de tu sistema
              <p>{new Date(task.date).toLocaleDateString()}</p> */}
              <p>
                {days(task.date).utc().format("DD/MM/YY")}
              </p>
              
          </div>
    </div>
  )
}
