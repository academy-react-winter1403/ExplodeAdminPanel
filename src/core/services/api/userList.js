import http from '../interceptor'

export const userList = async(RowsOfPage, PageNumber, search, role, activation)=>{
    try {
        const queryObj = {}
        if(RowsOfPage!== "" && RowsOfPage!==null) queryObj.RowsOfPage = RowsOfPage;
        if(PageNumber!== "" && PageNumber!==null) queryObj.PageNumber = PageNumber;
        if(search!== "" && search!==null) queryObj.Query = search;
        if(role!== "" && role!==null) queryObj.roleId = role;
        if(activation!== "" && activation!==null) queryObj.IsActiveUser = activation;

        const result = await http.get('/User/UserMannage',{params:queryObj})

        // console.log('dddd', result)
        return result
    } catch (error) {
        console.log(error)
    }
}

export const userCount = async(RowsOfPage, PageNumber)=>{
    try {
        const queryObj = {}
        if(RowsOfPage!== "" && RowsOfPage!==null) queryObj.RowsOfPage = RowsOfPage;
        if(PageNumber!== "" && PageNumber!==null) queryObj.PageNumber = PageNumber;

        const result = await http.get('/User/UserMannage',{params:queryObj})

        // console.log('dddd', result)
        return result
    } catch (error) {
        console.log(error)
    }
}