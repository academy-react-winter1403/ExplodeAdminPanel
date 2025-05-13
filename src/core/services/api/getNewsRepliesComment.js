import http from '../interceptor'

export const getNewsRepliesComment = async(id)=>{
    try {

        const result = await http.get(`/News/GetAdminRepliesComments?CommentId=${id}`)
        
        
        return result
        
    } catch (error) {
        console.log(error)
    }
}