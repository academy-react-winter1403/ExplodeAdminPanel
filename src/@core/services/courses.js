// import toast from 'react-hot-toast';
// import instance from '../axiosInstance';

// export const getTopCourses = async (urlParams) => {
//   try {
//     const response = await instance.get('/Home/GetCoursesTop', {
//       params: urlParams,
//     });
//     return response;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// export const getCoursesWithPagination = async (urlParams) => {
//   try {
//     const response = await instance.get('/Home/GetCoursesWithPagination', {
//       params: urlParams,
//     });
//     return response;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// export const getCategories = async () => {
//   try {
//     const response = await instance.get('/Home/GetTechnologies');
//     return response;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// export const getLevels = async () => {
//   try {
//     const response = await instance.get('/CourseLevel/GetAllCourseLevel');
//     return response;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// export const getCourseDetail = async (urlParams) => {
//   try {
//     const response = await instance.get('/Home/GetCourseDetails', { params: urlParams });
//     return response;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// }

// export const getCourseComments = async (courseId) => {
//   try {
//     const response = await instance.get(`/Course/GetCourseCommnets/${courseId}`);
//     return response;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// }

// export const AddCommentCourse = async (loading, obj) => {
//   try {
//     const formData = new FormData();
//     formData.append('CourseId', obj.CourseId)
//     formData.append('Title', obj.Title)
//     formData.append('Describe', obj.Describe)
//     loading(true)
//     const response = await instance.post(`/Course/AddCommentCourse`, formData);
//     loading(false)
//     toast.success('پس از تایید ادمین نظر شما نمایش داده میشود')
//     console.log(response)
//     return response;
//   } catch (error) {
//     loading(false)
//     console.error('Error:', error);
//     throw error;
//   }
// }

// export const addCommentReplyCourse = async (loading, obj) => {
//   try {
//     const formData = new FormData();
//     formData.append('CommentId', obj.CommentId)
//     formData.append('CourseId', obj.CourseId)
//     formData.append('Title', obj.Title)
//     formData.append('Describe', obj.Describe)
//     loading(true)
//     const response = await instance.post(`/Course/AddReplyCourseComment`, formData);
//     loading(false)
//     toast.success('پس از تایید ادمین نظر شما نمایش داده میشود')
//     console.log(response)
//     return response;
//   } catch (error) {
//     loading(false)
//     console.error('Error:', error);
//     throw error;
//   }
// }

// export const addLikeForCourseComment = async (commentId, setLoading) => {
//   try {
//     setLoading(true)
//     const response = await instance.post(`/Course/AddCourseCommentLike`, null, {
//       params: { CourseCommandId: commentId },
//     })
//     toast.success(response.message)
//     setLoading(false)
//     return response;
//   } catch (error) {
//     setLoading(false)
//     throw error;
//   }
// }

// export const addDissLikeForCourseComment = async (commentId, setLoading) => {
//   try {
//     setLoading(true)
//     const response = await instance.post(`/Course/AddCourseCommentDissLike`, null, {
//       params: { CourseCommandId: commentId },
//     })
//     toast.success(response.message)
//     setLoading(false)
//     return response;
//   } catch (error) {
//     setLoading(false)
//     throw error;
//   }
// }

// export const addCourseRate = async (courseId, courseRate, setLoading) => {
//   try {
//     setLoading(true)
//     const response = await instance.post(`/Course/SetCourseRating`, null, {
//       params: { CourseId: courseId, RateNumber: courseRate },
//     })
//     toast.success(response.message)
//     setLoading(false)
//     return response;
//   } catch (error) {
//     setLoading(false)
//     throw error;
//   }
// }

// export const addCourseToFavoriteList = async (id, setLoading) => {
//   try {
//     setLoading(true)
//     const response = await instance.post(`/Course/AddCourseFavorite`, { courseId: id })
//     toast.success(response.message)
//     setLoading(false)
//     return response;
//   } catch (error) {
//     setLoading(false)
//     throw error;
//   }
// }

// export const addLikeForCourse = async (id, setLoading) => {
//   try {
//     setLoading(true)
//     const response = await instance.post(`/Course/AddCourseLike`, null, {
//       params: { CourseId: id }
//     })
//     toast.success(response.message)
//     setLoading(false)
//     return response;
//   } catch (error) {
//     setLoading(false)
//     throw error;
//   }
// }

// export const addDisLikeForCourse = async (id, setLoading) => {
//   try {
//     setLoading(true)
//     const response = await instance.post(`/Course/AddCourseDissLike`, null, {
//       params: { CourseId: id }
//     })
//     toast.success(response.message)
//     setLoading(false)
//     return response;
//   } catch (error) {
//     setLoading(false)
//     throw error;
//   }
// }

// export const addToReserve = async (id, setLoading) => {
//   try {
//     setLoading(true)

//     const response = await instance.post(`/CourseReserve/ReserveAdd`, { courseId: id })
//     toast.success(response.message)
//     setLoading(false)
//     return response;
//   } catch (error) {
//     setLoading(false)
//     throw error;
//   }
// }
