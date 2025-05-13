import http from '../interceptor'


const getCourseDetail = async(id)=>{
    try {

        const result = await http.get(`/Course/${id}`)
        // console.log('qqq',id)
        
        return result
        
    } catch (error) {
        console.log(error)
    }
}
export default getCourseDetail