import axios from 'axios';

export default axios.create({
    baseURL: process.env.EXPO_PUBLIC_SPRING_API,
    withCredentials:true,
    timeout:10*1000
})