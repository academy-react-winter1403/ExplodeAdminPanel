import http from '../interceptor'
import toast from 'react-hot-toast'

export const completeUser = async(value)=>{
    try {
        const result = await http.put('/User/UpdateUser',value)
        return result
    } catch (error) {
        toast.error(error)
    }
}
// error.response.data.ErrorMessage[0]