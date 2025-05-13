import http from '../interceptor'


const getComment = async(RowsOfPage, PageNumber, search, currentStatus)=>{
    try {
        const queryObj = {}
        if(RowsOfPage!== "" && RowsOfPage!==null) queryObj.RowsOfPage = RowsOfPage;
        if(PageNumber!== "" && PageNumber!==null) queryObj.PageNumber = PageNumber;
        if(search!=='' && search!== null) queryObj.Query = search;
        if(currentStatus!==''&& currentStatus!==null) queryObj.Accept =currentStatus;

        const result = await http.get('/Course/CommentManagment',{params:queryObj})

        // console.log('dddd', result)
        return result
    } catch (error) {
        console.log(error)
    }
}

export default getComment