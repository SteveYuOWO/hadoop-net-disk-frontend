import axios from 'axios';


const http = axios.create({
    baseURL: 'http://localhost:8080/hadoopnetdisk',
    timeout: 1000 * 50,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    }
})

export default http