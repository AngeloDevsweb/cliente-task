import axios from './axios'

//const API = 'http://localhost:4000/api'

export const registerRequest = async(user) => {
    // try {
        //const response = await axios.post(`${API}/register`, user);
        const response = await axios.post(`/register`, user);
        return response.data
        
    // } catch (error) {
    //     //console.log(error.response.data);
    //     const errores = error.response.data
    //     return errores
    // }
} 

export const loginRequest = async(user) =>{
    //const response = await axios.post(`${API}/login`, user)
    const response = await axios.post(`/login`, user)
    return response.data;
}

export const verifyTokenRequest = async()=>{
    const response = await axios.get('/verify')
    return response.data;
}