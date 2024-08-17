import axios from 'axios';

const instane = axios.create({
	baseURL:"http://localhost:4444"
})

instane.interceptors.request.use((config)=>{
	config.headers.Authorization = window.localStorage.getItem('token')
	return config;
})

export default instane