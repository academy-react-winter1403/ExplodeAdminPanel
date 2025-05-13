import http from '../interceptor'


const getCourseReserve = async()=>{
    try {

        const result = await http.get('/CourseReserve')
        // console.log(result)
        return result
        
    } catch (error) {
        console.log(error)
    }
}
export default getCourseReserve