import instance from "../axiosInstance";

export const getAllUsers = async (urlParams) => {
  try {
    const response = await instance.get("/User/UserMannage", {
      params: urlParams,
    });
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const createUser = async (userData) => {
  try {
    const response = await instance.post("/User/CreateUser", userData);
    return response.data;
  } catch (error) {
    console.error("Error in createUserAPI:", error);
    throw error.response?.data || error.message;
  }
};
export const deleteUserById = async (userId) => {
  try {
    const response = await instance.delete("/User/DeleteUser", {
      data: {
        userId: userId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in deleteUserById:", error);
    throw error.response?.data || error.message;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await instance.get("/User/UserDetails/" + id);
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const updateUserApi = async (userData) => {
  try {
    const response = await instance.put("/User/UpdateUser", userData);
    return response;
  } catch (error) {
    console.error("Error in updateUserApi:", error);
    throw error.response?.data || error.message;
  }
};
export const reverseToActiveUser = async (id) => {
  try {
    const response = await instance.put("/User/ReverseToActiveUser", {
      userId: id,
    });
    return response;
  } catch (error) {
    console.error("Error in updateUserApi:", error);
    throw error.response?.data || error.message;
  }
};
export const getAccessToUser = async (data, enable) => {
  try {
    const response = await instance.post(
      `/User/AddUserAccess?Enable=${enable}`,
      data
    );
    return response;
  } catch (error) {
    console.error("Error in updateUserApi:", error);
    throw error.response?.data || error.message;
  }
};
