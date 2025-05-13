import http from '../interceptor'


export const DeleteCourseComment = async(id)=>{
    try {

        const result = await http.delete(`/Course/DeleteCourseComment?CourseCommandId=${id}`)
        // console.log('qqq',id)
        
        return result
        
    } catch (error) {
        console.log(error)
    }
}
