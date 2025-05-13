import http from '../interceptor'
import toast from 'react-hot-toast'

export const addNewsCommentReply = async(value)=>{
    try {
        const result = await http.post('/News/CreateNewsReplyComment',value)
        return result
    } catch (error) {
        toast.error(error)
    }
}