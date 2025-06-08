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

export const updateCourseInfo = async (formData, setLoading) => {
    try {
        console.log('Request')
        const response = await instance.put('/Course', formData)
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


export const getAllAssistance = async () => {
    try {
        const response = await instance.get(`/CourseAssistance`)
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}


export const addAssistance = async (id, uId) => {
    try {
        const response = await instance.post(`/CourseAssistance`, { courseId: id, userId: uId })
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}

export const updateAssistance = async (id, uId, assisId) => {
    try {
        const response = await instance.put(`/CourseAssistance`, { courseId: id, userId: uId, id: assisId })
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}

export const getAssistanceWork = async (assisId) => {
    try {
        const response = await instance.get(`/CourseAssistance/${assisId}`)
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}

export const addAssistanceWork = async (title, describe, assisId, date) => {
    try {
        const response = await instance.post(`/AssistanceWork`,
            {
                workTitle: title,
                workDescribe: describe,
                assistanceId: assisId,
                workDate: date,

            }
        )
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}

export const editAssistanceWork = async (title, describe, assisId, date, workId) => {
    try {
        const response = await instance.put(`/AssistanceWork`,
            {
                workTitle: title,
                workDescribe: describe,
                assistanceId: assisId,
                workDate: date,
                id: workId
            }
        )
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}


export const getBuildings = async () => {
    try {
        const response = await instance.get(`/Building`)
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}

export const createBuildings = async (buildName, wDate, floor, latitude, longitude) => {
    try {
        const response = await instance.post(`/Building`, {

            buildingName: buildName,
            workDate: wDate,
            floor: floor,
            latitude: latitude,
            longitude: longitude
        })
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}

export const editBuildings = async (params) => {
    try {
        const response = await instance.put(`/Building`, {
            id: params.id,
            buildingName: params.buildingName,
            workDate: params.workDate,
            floor: params.floor,
            latitude: params.latitude,
            longitude: params.longitude,
            active: params.active
        })
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}



export const buildingStatus = async (id, status) => {
    try {
        const response = await instance.put(`/Building/Active`, {
            active: status,
            id: id
        })
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}

export const getClassRooms = async () => {
    try {
        const response = await instance.get(`/ClassRoom`)
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}


export const createClassRoom = async (params) => {
    try {
        const response = await instance.post(`/ClassRoom`, {
            classRoomName: params.classRoomName,
            capacity: params.capacity,
            buildingId: params.buildingId
        })
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}

export const editClassRoom = async (params) => {
    try {
        const response = await instance.put(`/ClassRoom`, {
            id: params.id,
            classRoomName: params.classRoomName,
            capacity: params.capacity,
            buildingId: params.buildingId
        })
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}

export const getCourseLevels = async () => {
    try {
        const response = await instance.get(`/CourseLevel/GetAllCourseLevel`)
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}

export const editCourseLevel = async (params) => {
    try {
        const response = await instance.put(`/CourseLevel`, {
            id: params.id,
            levelName: params.levelName
        })
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}

export const createCourseLevel = async (params) => {
    try {
        const response = await instance.post(`/CourseLevel`, {
            levelName: params.levelName
        })
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}

export const getDeparments = async () => {
    try {
        const response = await instance.get(`/Department`)
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}

export const createDepartment = async (params) => {
    try {
        const response = await instance.post(`/Department`, {
            depName: params.depName,
            buildingId: params.buildingId
        })
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}

export const editDepartment = async (params) => {
    try {
        const response = await instance.put(`/Department`, {
            id: params.id,
            depName: params.depName,
            buildingId: params.buildingId
        })
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}


export const createStatus = async (params) => {
    try {
        const response = await instance.post(`/Status`, {
            statusName: params.statusName,
            describe: params.describe,
            statusNumber: params.statusNumber
        })
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}

export const getCourseStatus = async (params) => {
    try {
        const response = await instance.get(`/Status`)
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}

export const editStatus = async (params) => {
    try {
        const response = await instance.put(`/Status`, {
            id: params.id,
            statusName: params.statusName,
            describe: params.describe,
            statusNumber: params.statusNumber
        })
        return response
    } catch (error) {
        console.error("Error:", error);
        throw error;
    };
}