import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAdminScheduals,
  getTeacherScheduals,
  getStudentsScheduals,
  addSchedualSingle,
  updateSchedualSingle,
} from "../@core/services/schedual";

export const fetchSchedules = createAsyncThunk(
  "calendar/fetchSchedules",
  async ({ role, startDate, endDate }) => {
    let data;
    const params = { startDate, endDate };

    if (role === "teacher") {
      data = await getTeacherScheduals(params);
    } else if (role === "student") {
      data = await getStudentsScheduals(params);
    } else {
      data = await getAdminScheduals(params);
    }
    return data;
  }
);

export const addSchedule = createAsyncThunk(
  "calendar/addSchedule",
  async (scheduleData) => {
    const response = await addSchedualSingle(scheduleData);
    return response;
  }
);

export const updateSchedule = createAsyncThunk(
  "calendar/updateSchedule",
  async (scheduleData) => {
    const response = await updateSchedualSingle(scheduleData);
    return response;
  }
);

const CalendarSlice = createSlice({
  name: "calendar",
  initialState: {
    schedules: [],
    selectedRole: "all",
    loading: false,
    error: null,
  },
  reducers: {
    setRole(state, action) {
      state.selectedRole = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchedules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchedules.fulfilled, (state, action) => {
        state.loading = false;
        state.schedules = action.payload;
      })
      .addCase(fetchSchedules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addSchedule.fulfilled, (state, action) => {
        state.schedules.push(action.payload);
      })
      .addCase(updateSchedule.fulfilled, (state, action) => {
        const index = state.schedules.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) state.schedules[index] = action.payload;
      });
  },
});

export const { setRole } = CalendarSlice.actions;
export default CalendarSlice.reducer;
