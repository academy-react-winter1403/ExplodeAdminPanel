import toast from "react-hot-toast";
import instance from "../axiosInstance";
export const getAllCourses = async (urlParams) => {
    try {
        const response = await instance.get("/Course/CourseList", {
            params: urlParams,
        });
        return response;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const updateStatus = async (courseId, status, setButtonLoading, setCenteredModal) => {
    try {
        const response = await instance.put("/Course/ActiveAndDeactiveCourse", { active: status, id: courseId })
        toast.success(response.message)
        return response;
    } catch (error) {
        console.error("Error:", error);
        toast.error('به هنگام ارسال درخواست خطایی ایجاد شد | مجددا تلاش کنید')
        setButtonLoading(false)
        setCenteredModal(false)
        throw error;
    }
};

export const deleteCourse = async (courseId, status, setButtonLoading, setDeleteModal) => {
    try {
        const response = await instance.delete("/Course/DeleteCourse", {
            data: { active: status, id: courseId }
        })
        toast.success(response.message)
        return response;
    } catch (error) {
        console.error("Error:", error);
        setButtonLoading(false)
        setDeleteModal(false)
        throw error;
    }
};
export const courseComments = async (courseId) => {
    try {
        const response = await instance.get(`/Course/GetCourseCommnets/${courseId}`)
        toast.success(response.message)
        return response;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const courseCommentReplies = async (courseId, commentId) => {
    try {
        const response = await instance.get(`/Course/GetCourseReplyCommnets/${courseId}/${commentId}`)
        toast.success(response.message)
        return response;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const addCommentReplyCourse = async (loading, replyModal, obj) => {
    try {
        const formData = new FormData();
        formData.append('CommentId', obj.CommentId)
        formData.append('CourseId', obj.CourseId)
        formData.append('Title', obj.Title)
        formData.append('Describe', obj.Describe)
        loading(true)
        const response = await instance.post(`/Course/AddReplyCourseComment`, formData);
        loading(false)
        replyModal(false)
        return response;
    } catch (error) {
        loading(false)
        replyModal(false)
        console.error('Error:', error);
        throw error;
    }
}

export const deleteCourseReplyComment = async (commentId, buttonLoading, deleteModal) => {
    try {
        const response = await instance.delete(`/Course/DeleteCourseComment/`, { params: { CourseCommandId: commentId } })
        toast.success(response.message)
        return response;
    } catch (error) {
        console.error("Error:", error);
        buttonLoading(false)
        deleteModal(false)
        throw error;
    }
};


export const getCourseInfoForCreate = async () => {
    try {
        const response = await instance.get('/Course/GetCreate')
        return response;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};


export const addNewCourse = async (formData, setLoading) => {
    try {
        const response = await instance.post('/Course', formData)
        return response
    } catch (error) {
        console.error("Error:", error);
        setLoading(false)
        throw error;
    }
};

export const addTechnologyForCourse = async (id, techData) => {
    try {
        const response = await instance.post('/Course/AddCourseTechnology', techData, {
            params: {
                courseId: id
            }
        })
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};