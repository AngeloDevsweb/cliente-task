import { useEffect } from 'react'
import {useTasks} from '../context/TasksContext'
import TaskCard from '../components/TaskCard'

function TasksPage() {

  const {getTask, tasks} = useTasks()
  //este useeffect esta renderizando y haciendo peticion get
  //cada vez que sea necesario cuando haya un cambio en tasks o en las tareas en el backend
  useEffect(()=>{
    getTask()
  },[tasks])

  return (
    <div className='grid grid-cols-3 gap-2'>
      
      {
        tasks.map((task)=>(
          <TaskCard key={task._id} task={task} />
        ))
      }
    </div>
  )
}

export default TasksPage
