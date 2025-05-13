import http from '../interceptor'
import toast from 'react-hot-toast'


export const UpdateCourse = async(form)=>{
    try{
        const result = await http.put('/Course',form) 
        return result 
    }catch(error){
        toast.error(error.response.data.ErrorMessage[0])
    }
    
}

export const getCourseLevel = async()=>{
    try{
        const result = await http.get('/CourseLevel/GetAllCourseLevel') 
        return result 
    }catch(error){
        
    }
    
}
export const getTeacher = async()=>{
    try{
        const result = await http.get('/Home/GetTeachers') 
        return result 
    }catch(error){
        
    }
    
}


