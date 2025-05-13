import http from '../interceptor'
import toast from 'react-hot-toast'

const getNewsCategory = async()=>{
    try {
        // const queryObj = {}
        const result = await http.get('/News/GetListNewsCategory')
        
        return result
        // console.log('qqq', result)
    } catch (error) {
        console.log(error)
    }
}
export default getNewsCategory




export const postAddNews = async(form)=>{
    try {
        // const queryObj = {}
        const result = await http.post('/News/CreateNews',form)
        
        return result
        // console.log('qqq', result)
    } catch (error) {
        toast.error(error.response.data.ErrorMessage[0])
    }
}

