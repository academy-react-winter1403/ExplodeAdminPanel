import http from '../interceptor'

export const getCourseRepliesComment = async(CourseId, CommentId)=>{
    try {

        const result = await http.get(`/Course/GetCourseReplyCommnets/${CourseId}/${CommentId}`)
        
        
        return result
        
    } catch (error) {
        console.log(error)
    }
}