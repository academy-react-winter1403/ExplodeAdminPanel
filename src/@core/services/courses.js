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