import http from '../interceptor'
import toast from 'react-hot-toast'

export const postAddUser = async(value)=>{
    try {
      const result = await http.post('/User/CreateUser',value)

      return result
        // console.log(result)
      
    } catch (error) {
        toast.error(error.response.data.ErrorMessage[0])
    }
}