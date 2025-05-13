import http from '../interceptor'


export const acceptComment = async(id)=>{
    try {

        const result = await http.post(`/Course/AcceptCourseComment?CommentCourseId=${id}`)
        // console.log('qqq',id)
        
        return result
        
    } catch (error) {
        console.log(error)
    }
}