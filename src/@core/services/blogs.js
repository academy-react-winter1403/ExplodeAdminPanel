import toast from 'react-hot-toast';
import instance from '../axiosInstance';

export const getBlogsList = async (urlParams) => {
    try {
        const response = await instance.get('/News/AdminNewsFilterList', { params: urlParams });
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const deleteBlog = async (blogId, status) => {
    const formData = new FormData()
    formData.append('Active', status)
    formData.append('Id', blogId)
    try {
        const response = await instance.put('/News/ActiveDeactiveNews', formData);
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const getBlogsReplies = async (commentId) => {
    try {
        const response = await instance.get('/News/GetAdminRepliesComments', { params: { CommentId: commentId } });
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const getBlogsComments = async (id) => {
    try {
        const response = await instance.get('/News/GetNewsComments', { params: { NewsId: id } });
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const addBlogReplyComment = async (loading, obj) => {
    try {
        loading(true);
        const response = await instance.post(`/News/CreateNewsReplyComment`, obj);
        loading(false);
        toast.success('نظر شما با موفقیت ثبت شد');
        console.log(response);
        return response;
    } catch (error) {
        loading(false);
        console.error('Error:', error);
        throw error;
    }
};


export const getCategories = async () => {
    try {
        const response = await instance.get('/News/GetListNewsCategory');
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


export const getNewsById = async (id) => {
    try {
        const response = await instance.get(`/News/${id}`);
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const updateCategories = async (obj) => {
    const formData = new FormData()
    formData.append('Id', obj.Id)
    formData.append('CategoryName', obj.CategoryName)
    formData.append('GoogleTitle', obj.GoogleTitle)
    formData.append('GoogleDescribe', obj.GoogleDescribe)
    try {
        const response = await instance.put('/News/UpdateNewsCategory', formData);
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const createCategories = async (obj) => {
    const formData = new FormData()
    formData.append('CategoryName', obj.addCategoryName)
    formData.append('GoogleTitle', obj.addGoogleTitle)
    formData.append('GoogleDescribe', obj.addGoogleDescribe)
    try {
        const response = await instance.post('/News/CreateNewsCategory', formData);
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const createNewBlog = async (obj, blogImage) => {
    const formData = new FormData()
    formData.append('Title', obj.blogTitle)
    formData.append('GoogleTitle', obj.googleTitle)
    formData.append('GoogleDescribe', obj.googleDescribe)
    formData.append('MiniDescribe', obj.miniDescribe)
    formData.append('Describe', obj.editorContent)
    formData.append('Keyword', obj.keyWords)
    formData.append('NewsCatregoryId', obj.blogCategory.value)
    formData.append('Image', blogImage)
    try {
        const response = await instance.post('/News/CreateNews', formData);
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const updateBlogInfo = async (obj, blogId, blogImage) => {
    const formData = new FormData()
    formData.append('Id', blogId)
    formData.append('Title', obj.blogTitle)
    formData.append('GoogleTitle', obj.googleTitle)
    formData.append('GoogleDescribe', obj.googleDescribe)
    formData.append('MiniDescribe', obj.miniDescribe)
    formData.append('Describe', obj.editorContent)
    formData.append('Keyword', obj.keyWords)
    formData.append('NewsCatregoryId', obj.blogCategory.value)
    formData.append('CurrentImageAddress', blogImage)
    formData.append('CurrentImageAddressTumb', blogImage)
    formData.append('Image', blogImage)
    formData.append('Active', true)
    try {
        const response = await instance.put('/News/UpdateNews', formData);
        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
