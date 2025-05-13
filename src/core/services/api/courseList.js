import http from '../interceptor'

export const courseList = async(RowsOfPage, PageNumber, search, expire)=>{
    try {
        const queryObj = {}
        if(RowsOfPage!== "" && RowsOfPage!==null) queryObj.RowsOfPage = RowsOfPage;
        if(PageNumber!== "" && PageNumber!==null) queryObj.PageNumber = PageNumber;
        if(search!== "" && search!==null) queryObj.Query = search;
        if(expire!== "" && expire!==null) queryObj.SortType = expire;
        // console.log(RowsOfPage, PageNumber, search, expire )


        const result = await http.get('/Course/CourseList',{params:queryObj})
        return result;
    } catch (error) {
        console.log(error)
    }
}

export const courseNumber = async(RowsOfPage, PageNumber)=>{
    try {
        const queryObj = {}
        if(RowsOfPage!== "" && RowsOfPage!==null) queryObj.RowsOfPage = RowsOfPage;
        if(PageNumber!== "" && PageNumber!==null) queryObj.PageNumber = PageNumber;

        const result = await http.get('/Course/CourseList',{params:queryObj})
        return result;
    } catch (error) {
        console.log(error)
    }
}