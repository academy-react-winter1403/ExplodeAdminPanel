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

export const deleteCourseReplyComment = async (commentId, buttonLoading = false, deleteModal = false) => {
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
export const getNotAcceptedComments = async (urlParams) => {
    try {
        const response = await instance.get('/Course/CommentManagment', { params: urlParams })
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const acceptComment = async (id) => {
    try {
        const response = await instance.post(`/Course/AcceptCourseComment?CommentCourseId=${id}`)
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const getCourseById = async (courseId) => {
    try {
        const response = await instance.get(`/Course/${courseId}`)
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const getCourseGroups = async (urlParams) => {
    try {
        const response = await instance.get(`/CourseGroup/GetCourseGroup`, { params: urlParams })
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export const editeCourseGroups = async (obj) => {
    const formData = new FormData()
    formData.append('Id', obj.Id)
    formData.append('GroupName', obj.GroupName)
    formData.append('CourseId', obj.CourseId)
    formData.append('GroupCapacity', obj.GroupCapacity)

    try {
        const response = await instance.put(`/CourseGroup`, formData)
        return response
    } catch (error) {
        console.error("Error:", error);
        toast.error('ظرفیت بیشتر از 255 تا نمیتواند باشد')
        throw error;
    };
}


export const deleteCourseGroup = async (id) => {
    const formData = new FormData()
    formData.append('Id', id)
    try {
        const response = await instance.delete(`/CourseGroup`, { data: formData })
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}

export const addCourseGroup = async (obj) => {
    const formData = new FormData()
    formData.append('GroupName', obj.GroupName)
    formData.append('CourseId', obj.CourseId)
    formData.append('GroupCapacity', obj.GroupCapacity)
    try {
        const response = await instance.post(`/CourseGroup`, formData)
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}

export const getCourseReserve = async (courseId) => {
    try {
        const response = await instance.get(`/CourseReserve/${courseId}`)
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}

export const changeCourseReserve = async (courseId, courseGroupId, studentId) => {
    try {
        const response = await instance.post(`/CourseReserve/SendReserveToCourse`, { courseId: courseId, courseGroupId: courseGroupId, studentId: studentId })
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}

export const deleteCourseReserve = async (reservId) => {
    try {
        const response = await instance.delete(`/CourseReserve`, {
            data: { id: reservId }
        })
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}

export const getCoursePayments = async (courseId) => {
    try {
        const response = await instance.get(`/CoursePayment/ListOfWhoIsPay?CourseId=${courseId}`)
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}

export const getCoursePaymentsList = async (courseId) => {
    try {
        const response = await instance.get(`/CoursePayment?CourseId=${courseId}`)
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}

export const deleteCoursePayment = async (paymentId) => {
    const formData = new FormData()
    formData.append('PaymentId', paymentId)
    try {
        const response = await instance.delete(`/CoursePayment`, { data: formData })
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}

export const acceptCoursePayment = async (paymentId) => {
    const formData = new FormData()
    formData.append('PaymentId', paymentId)
    try {
        const response = await instance.put(`/CoursePayment/Accept`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}

export const getCourseStatusList = async (courseId) => {
    try {
        const response = await instance.get(`/Status`)
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}

export const changeCourseStatus = async (courseId, statusId) => {
    const formData = new FormData()
    formData.append('CourseId', courseId)
    formData.append('StatusId', statusId)
    try {
        const response = await instance.put(`/Course/UpdateCourseStatus`, formData)
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}