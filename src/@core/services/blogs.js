// import toast from 'react-hot-toast';
// import instance from '../axiosInstance';

// export const getBlogsList = async (urlParams) => {
//   try {
//     const response = await instance.get('/News', { params: urlParams });
//     return response;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// export const getMyFavoriteBlogs = async (urlParams) => {
//   try {
//     const response = await instance.get('/SharePanel/GetMyFavoriteNews', {
//       params: urlParams,
//     });
//     console.log('response', response);
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// export const getBlogsCategories = async () => {
//   try {
//     const response = await instance.get('/News/GetListNewsCategory');
//     return response;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// export const getBlogById = async (blogId) => {
//   try {
//     const response = await instance.get(`/News/${blogId}`);
//     return response;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// export const getBlogComments = async (params) => {
//   try {
//     const response = await instance.get(`/News/GetNewsComments`, {
//       params: params,
//     });
//     return response;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// export const AddCommentBlog = async (loading, obj) => {
//   try {
//     loading(true);
//     const response = await instance.post(`/News/CreateNewsComment`, obj);
//     loading(false);
//     toast.success('نظر شما با موفقیت ثبت شد');
//     console.log(response);
//     return response;
//   } catch (error) {
//     loading(false);
//     console.error('Error:', error);
//     throw error;
//   }
// };

// export const addBlogReplyComment = async (loading, obj) => {
//   try {
//     loading(true);
//     const response = await instance.post(`/News/CreateNewsReplyComment`, obj);
//     loading(false);
//     toast.success('نظر شما با موفقیت ثبت شد');
//     console.log(response);
//     return response;
//   } catch (error) {
//     loading(false);
//     console.error('Error:', error);
//     throw error;
//   }
// };

// export const addDissLikeForBlogComment = async (
//   commentId,
//   likeType,
//   setLoading,
// ) => {
//   try {
//     setLoading(true);
//     const response = await instance.post(
//       `/News/CommentLike/${commentId}`,
//       null,
//       {
//         params: { LikeType: likeType },
//       },
//     );
//     toast.success(response.success);
//     setLoading(false);
//     return response;
//   } catch (error) {
//     setLoading(false);
//     throw error;
//   }
// };

// export const addBlogRate = async (newsId, blogRate, setLoading) => {
//   try {
//     setLoading(true);
//     const response = await instance.post(`/News/NewsRate`, null, {
//       params: { NewsId: newsId, RateNumber: blogRate },
//     });
//     toast.success(response.message);
//     setLoading(false);
//     return response;
//   } catch (error) {
//     setLoading(false);
//     throw error;
//   }
// };

// export const addBlogToFavoriteList = async (id, setLoading) => {
//   try {
//     setLoading(true);
//     const response = await instance.post(`/News/AddFavoriteNews`, null, {
//       params: { NewsId: id },
//     });
//     toast.success(response.message);
//     setLoading(false);
//     return response;
//   } catch (error) {
//     setLoading(false);
//     throw error;
//   }
// };

// export const addLikeForBlog = async (id, setLoading) => {
//   try {
//     setLoading(true);
//     const response = await instance.post(`/News/NewsLike/${id}`);
//     toast.success(response.message);
//     setLoading(false);
//     return response;
//   } catch (error) {
//     setLoading(false);
//     throw error;
//   }
// };

// export const addDisLikeForBlog = async (id, setLoading) => {
//   try {
//     setLoading(true);
//     const response = await instance.post(`/News/NewsDissLike/${id}`);
//     toast.success(response.message);
//     setLoading(false);
//     return response;
//   } catch (error) {
//     setLoading(false);
//     throw error;
//   }
// };
