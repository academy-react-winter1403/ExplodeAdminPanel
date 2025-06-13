import instance from "../axiosInstance";

export const getAdminScheduals = async (urlParams) => {
  try {
    const response = await instance.get("/Schedual/GetAdminScheduals", {
      params: urlParams,
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const getTeacherScheduals = async (urlParams) => {
  try {
    const response = await instance.get("/Schedual/GetTeacherScheduals", {
      params: urlParams,
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const getStudentsScheduals = async (urlParams) => {
  try {
    const response = await instance.get("/Schedual/GetStudentScheduals", {
      params: urlParams,
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const addSchedualsAutomatic = async (currentCurseId) => {
  try {
    const response = await instance.post(
      "/Schedual/AddSchedualAutomatic",
      currentCurseId
    );
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const addSchedualSingle = async (currentCurseId) => {
  try {
    const response = await instance.post(
      "/Schedual/AddSchedualSingle",
      currentCurseId
    );
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const updateSchedualSingle = async (currentCurseId) => {
  try {
    const response = await instance.put(
      "/Schedual/UpdateSchedualSingle",
      currentCurseId
    );
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
