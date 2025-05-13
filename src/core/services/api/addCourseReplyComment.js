import http from '../interceptor'
import toast from 'react-hot-toast'

export const AddReplyCourseComment = async(form)=>{
    try {
        const result = await http.post('/Course/AddReplyCourseComment',form)
        return result
    } catch (error) {
        toast.error(error.response.data.ErrorMessage[0])
    }
}