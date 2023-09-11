import {useForm} from 'react-hook-form'
//import {registerRequest} from '../api/auth'
import {useNavigate, Link} from 'react-router-dom'
//debo traer el usecontext o en este caso el hook personalizado para traer el contexto de la app
import {useAuth} from '../context/AuthContext'
import { useEffect } from 'react'

const RegisterPage = () => {

  const {register, handleSubmit, formState: {errors}, } = useForm()
  const {signup, isAuthenticated, errors: registerErrors} = useAuth()
  const navigate = useNavigate()

  //console.log(user);

  useEffect(()=>{
    if(isAuthenticated){
      navigate('/tasks')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isAuthenticated])

  const onSubmit = handleSubmit(async(values)=>{
    // try {
    // const res = await registerRequest(values)
    // console.log(res);
    // } catch (error) {
    //   console.error('Error:', error);
    // }
    signup(values)
  })

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md">
      {
        registerErrors.map((error, i) =>(
          <div className='bg-red-600 p-2 text-white ' key={i}>
            {error}
          </div>
        ))
      }
      <form onSubmit={onSubmit}>
        <input
          type="text"
          {...register("username", { required: true })}
          placeholder="Username"
          className="w-full bg-zinc-700 text-white px-4 rounded-md my-2"
        />
        {
          errors.username && <p className='text-red-500'>username is required</p>
        }
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="email"
          className="w-full bg-zinc-700 text-white px-4 rounded-md my-2"
        />
         {
          errors.username && <p className='text-red-500'>email is required</p>
        }
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="password"
          className="w-full bg-zinc-700 text-white px-4 rounded-md my-2"
        />
         {
          errors.username && <p className='text-red-500'>password is required</p>
        }
        <button type="submit">Register</button>
      </form>
      <p className="flex gap-x-2 justify-between">
          Ya tienes cuenta? <Link to="/login" className="text-sky-700" >Login</Link>
        </p>
    </div>
  );
}

export default RegisterPage
