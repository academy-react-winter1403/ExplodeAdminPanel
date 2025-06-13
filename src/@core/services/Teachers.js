import instance from "../axiosInstance";

export const getTeacher = async () => {
  try {
    const response = await instance.get("/Home/GetTeachers");
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
