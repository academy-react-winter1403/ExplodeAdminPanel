import http from '../interceptor'

export const statics = async()=>{
    try {
        const result = await http.get('/Home/LandingReport')
        return result;
    } catch (error) {
        console.log(error)
    }
}

