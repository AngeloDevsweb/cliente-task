import { createContext, useState, useContext, useEffect } from "react";
import {registerRequest, loginRequest, verifyTokenRequest} from '../api/auth'
import Galleta from 'js-cookie'


//contexto de la aplicacion
export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an Authprovider");
  }

  return context;
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    //variable de estado global que va obtener y guardar la informacion del usuario
  const [user, setUser] = useState(null);
  //funcion para saber si esta autenticado o no
  const [isAuthenticated, setAuthenticated] = useState(false)
  const [errors, setErrors] = useState([])
  const [loading, setLoading] = useState(true)


    //funcion para poder registrar al usuario
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res);
      setUser(res);
      setAuthenticated(true);
    } catch (error) {
      //console.error('Error:', error);
      setErrors(error.response.data);
      //console.log(response.data);
    }
  };

  //funcion para autenticarse

  const signin = async(user)=>{
    try { 
      const res = await loginRequest(user)
      console.log(res);
      setUser(res);
      setAuthenticated(true);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data)
    }
  }

  // alerta para mostrar errores durante 5 segundos
  useEffect(()=>{
    if(errors.length>0){
      const timer = setTimeout(()=>{
        setErrors([])
      },5000)
      return ()=> clearTimeout(timer)
    }
  },[errors])

  const logout =()=>{
    Galleta.remove('token')
    setAuthenticated(false)
    setUser(null)
  }

  //para validar el token del usuario en el backend y permita navegar a traves de las rutas
  //seccion rutas protegidas

  useEffect(()=>{
    async function checkLogin(){
      const cookies = Galleta.get()

      if(!cookies.token){
        setAuthenticated(false)
        setLoading(false)
        return setUser(null)
      }

      try {
        const res = await verifyTokenRequest(cookies.token)
        if(!res){
          setAuthenticated(false)
          setLoading(false)
          return;
        }

        setAuthenticated(true)
        setUser(res)
        setLoading(false)
      } catch (error) {
        console.log(error);
        setAuthenticated(false)
        setUser(null)
        setLoading(false)
      }


    }
    

    
    // if(cookies.token){
    //   console.log(cookies.token);
    // }
    checkLogin()
  },[])

  return (
    <AuthContext.Provider value={{ signup, user, isAuthenticated, errors, signin, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
