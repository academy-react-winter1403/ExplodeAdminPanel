import instance from "../axiosInstance";
export const getAllCoursesAdmin = async (urlParams) => {
  try {
    const response = await instance.get("/Course/CourseList?", {
      params: urlParams,
    });
    return response;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};
