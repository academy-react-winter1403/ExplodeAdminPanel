import axios from "axios";




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
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImNhN2EwOGExLWI0YjAtNDc0Yy05MTkxLTcyYTVlOTJkYWQ0MCIsInN1YiI6ImNhN2EwOGExLWI0YjAtNDc0Yy05MTkxLTcyYTVlOTJkYWQ0MCIsImp0aSI6ImNkYzIyMzgxLTkxN2ItNDFmMi1hNzBhLTFmODYyMGI5M2Q4NyIsImVtYWlsIjoibWlsYWQuaC5iMTM4MkBnbWFpbC5jb20iLCJVaWQiOiJLSlN0NlhnV2crTUdaNi9VeHZ0blpBbFBzR3pkbCsrRWg5NGYyeGpFRFdzPUVzNzg4OWRkNzNmOGMwZDljYWRmNTU0MmVlN2E4OTY3MDYwMWU5NGQwZDU2ZDAzZDVkNzBlZmY4MjFjM2JmN2M1YmFiMjciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiUmVmZXJlZSIsIkFkbWluaXN0cmF0b3IiLCJUZWFjaGVyIl0sImV4cCI6MTc0NzgwOTcxOCwiaXNzIjoiU2VwZWhyQWNhZGVteSIsImF1ZCI6IlNlcGVockFjYWRlbXkifQ.94DRLDxyvIvpKBZEU4iyPkpmW0Pf4Nnzt9kLIIORDI8";


    //  opt.headers['MessageTest'] = "Hello World"; 
    //  opt.headers['Content-Type'] = "application/json";
    if (token) opt.headers.Authorization = 'Bearer ' + token;
    return opt
})

export default instance;