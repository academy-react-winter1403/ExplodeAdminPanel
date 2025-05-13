import http from '../interceptor'


export const getCourseSteps = async()=>{
    try {
        const result = await http.get('/Course/GetCreate')
        
        return result
    } catch (error) {
        console.log(error)
    }
}
