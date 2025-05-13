import http from '../interceptor'


export const RejectComment = async(id)=>{
    try {

        const result = await http.post(`/Course/RejectCourseComment?CommentCourseId=${id}`)
        // console.log('qqq',id)
        
        return result
        
    } catch (error) {
        console.log(error)
    }
}