import http from '../interceptor'


const getNewsDetail = async(id)=>{
    try {

        const result = await http.get(`/News/${id}`)
        // console.log('qqq',id)
        
        return result
        
    } catch (error) {
        console.log(error)
    }
}
export default getNewsDetail
