import http from '../../../core/interceptor/index'

export const newsList = async(RowsOfPage, PageNumber, search, activation)=>{
    try {
        const queryObj = {}
        if(RowsOfPage!== "" && RowsOfPage!==null) queryObj.RowsOfPage = RowsOfPage;
        if(PageNumber!== "" && PageNumber!==null) queryObj.PageNumber = PageNumber;
        if(search!== "" && search!==null) queryObj.Query = search;
        if(activation!== "" && activation!==null) queryObj.IsActive = activation;
        const result = await http.get('/News/AdminNewsFilterList',{params:queryObj})
        return result;
    } catch (error) {
        console.log(error)
    }
}

export const newsCount = async(RowsOfPage, PageNumber)=>{
    try {
        const queryObj = {}
        if(RowsOfPage!== "" && RowsOfPage!==null) queryObj.RowsOfPage = RowsOfPage;
        if(PageNumber!== "" && PageNumber!==null) queryObj.PageNumber = PageNumber;

        const result = await http.get('/News/AdminNewsFilterList',{params:queryObj})
        return result;
    } catch (error) {
        console.log(error)
    }
}