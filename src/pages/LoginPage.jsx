import { useForm } from "react-hook-form";
import {useAuth} from '../context/AuthContext'
import {Link, useNavigate} from 'react-router-dom'
import { useEffect } from "react";

const LoginPage = () => {

  const navigate = useNavigate()
  const {signin, errors : signinErrors, isAuthenticated} = useAuth()

  const {register, handleSubmit, formState: {errors}} = useForm();

  const onSubmit = handleSubmit((data)=>{
    //console.log(data);
    signin(data)
  })

  useEffect(()=>{
    if(isAuthenticated){
      navigate('/tasks')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isAuthenticated])

  return (
    <div className="bg-zinc-800  rounded-md flex h-[calc(100vh-100px)] items-center justify-center">
      {
        signinErrors.map((error, i) =>(
          <div className='bg-red-600 p-2 text-white ' key={i}>
            {error}
          </div>
        ))
      }
      <form onSubmit={onSubmit}>     
        <h1 className="text-2xl font-bold" >Login</h1>
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="email"
          className="w-full bg-zinc-700 text-white px-4 rounded-md my-2"
        />
         {
          errors.email && <p className='text-red-500'>email is required</p>
        }
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="password"
          className="w-full bg-zinc-700 text-white px-4 rounded-md my-2"
        />
         {
          errors.password && <p className='text-red-500'>password is required</p>
        }
        <button type="submit">Login</button>
      </form>
        <p className="flex gap-x-2 justify-between">
          No tienes cuenta? <Link to="/register" className="text-sky-700" >Sign up</Link>
        </p>
    </div>
  )
}

export default LoginPage
