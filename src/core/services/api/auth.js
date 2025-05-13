import http from '../interceptor'

export const signin=async (values)=>{
    try {
        
        const res = await http.post('/Sign/Login', values)
        return res
    } catch (error) {
        console.log(error);
        return []
    }
}