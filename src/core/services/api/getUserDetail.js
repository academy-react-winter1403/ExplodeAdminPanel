import http from '../interceptor'


const getUserDetail = async(id)=>{
    try {

        const result = await http.get(`/User/UserDetails/${id}`)
        // console.log('qqq',id)
        
        return result
        
    } catch (error) {
        console.log(error)
    }
}
export default getUserDetail