import axios from './axios'

export const getTasksRequest = async() => {
    // try {
        //const response = await axios.post(`${API}/register`, user);
        const response = await axios.get(`/tasks`);
        return response.data     
   
} 

export const getTaskRequest = async(id) => {
    // try {
        //const response = await axios.post(`${API}/register`, user);
        const response = await axios.get(`/tasks/${id}`);
        return response.data     
   
} 

export const createTaskRequest = async(task) => {
    // try {
        //const response = await axios.post(`${API}/register`, user);
        const response = await axios.post(`/tasks`, task);
        return response.data     
   
} 

export const updateTaskRequest = async(id,task) => {
    // try {
        //const response = await axios.post(`${API}/register`, user);
        const response = await axios.put(`/tasks/${id}`, task);
        return response.data     
   
} 

export const deleteTaskRequest = async(id) => {
    // try {
        //const response = await axios.post(`${API}/register`, user);
        const response = await axios.delete(`/tasks/${id}`);
        return response     
   
} 