import axios from "axios";
import { getItem } from "../common/storage.services";




const baseURL = "https://classapi.sepehracademy.ir/api";

const instance = axios.create({
    baseURL: baseURL,
});

const onSuccess = (response) => {
    return response.data
}

const onError = (err) => {
    // console.log(err);

    // if(err.response.status === 401){
    //     // clearStorage()
    //     removeItem('token');
    //     window.location.pathname = '/' // or '/login'
    // }

    // if(err.response.status >= 400 && err.response.status < 500){
    //     // alert("Client request error: " + err.response.status);
    // }

    return Promise.reject(err);
}

instance.interceptors.response.use(onSuccess, onError);

instance.interceptors.request.use(opt => {

    //const user = useSelector(state => state.user)

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImNhN2EwOGExLWI0YjAtNDc0Yy05MTkxLTcyYTVlOTJkYWQ0MCIsInN1YiI6ImNhN2EwOGExLWI0YjAtNDc0Yy05MTkxLTcyYTVlOTJkYWQ0MCIsImp0aSI6ImI3YmUzOGQyLWYxMDYtNDhiYy1hNjA0LTg4YjIyM2ZlMDUxNiIsImVtYWlsIjoibWlsYWQuaC5iMTM4MkBnbWFpbC5jb20iLCJVaWQiOiJUbTJtSHN3eDZTanFFL2RpbWl3SElLd1VlSHJZUjZjMmN4YTE3QWRHbnhzPUVzNzg4OWRkNzNmOGMwZDljYWRmNTU0MmVlN2E4OTY3MDYwMWU5NGQwZDU2ZDAzZDVkNzBlZmY4MjFjM2JmN2M1YmFiMjciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiUmVmZXJlZSIsIkFkbWluaXN0cmF0b3IiLCJTdHVkZW50IiwiVGVhY2hlciJdLCJleHAiOjE3NDcxNDU5OTUsImlzcyI6IlNlcGVockFjYWRlbXkiLCJhdWQiOiJTZXBlaHJBY2FkZW15In0.m-Wx6r5RlWWfcc1Ct9XjiXMKwzHnSOuM_iB-GHZ3LlI";


    //  opt.headers['MessageTest'] = "Hello World"; 
    //  opt.headers['Content-Type'] = "application/json";
    if (token) opt.headers.Authorization = 'Bearer ' + token;
    return opt
})

export default instance;