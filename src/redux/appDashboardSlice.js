import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getDashboardReport,
  getLandingReportsApi,
  getTechnologyReports,
} from "../@core/services/dashboardReports";
import { getAllCoursesAdmin } from "../@core/services/courses";
import { getTeacher } from "../@core/services/Teachers";

// ** API Call

// Get all data (بدون فیلتر)
export const getDashboardReports = createAsyncThunk(
  "appDashboard/getDashboardReports",
  async () => {
    const response = await getDashboardReport();
    return response || [];
  }
);
export const getLandingReports = createAsyncThunk(
  "appDashboard/getLandingReports",
  async () => {
    const response = await getLandingReportsApi();
    return response || [];
  }
);

export const getDashboardTechReports = createAsyncThunk(
  "appDashboard/getDashboardTechReports",
  async () => {
    const response = await getTechnologyReports();
    return response || [];
  }
);

export const getDashboardCourses = createAsyncThunk(
  "appDashboard/getDashboardCourses",
  async () => {
    const params = {
      PageNumber: 1,
      RowsOfPage: 50,
      SortingCol: "createdAt", // یا هر ستون دیگری که API پشتیبانی کند
      SortType: "DESC", // یا "ASC" برای صعودی
      Query: "", // در صورت نیاز به جستجو
    };

    const response = await getAllCoursesAdmin(params);
    return response || [];
  }
);
export const getTeacherReport = createAsyncThunk(
  "appDashboard/getTeacherReport",
  async () => {
    const response = await getTeacher();
    return response || [];
  }
);
const transformCourseData = (courses) => {
  return courses.map((course, index) => ({
    id: course.courseId || index,
    name: course.title || `دوره ${index + 1}`,

    cost:
      typeof course.cost === "string"
        ? parseInt(course.cost.replace(/,/g, ""), 10)
        : course.cost || 0,
    reserveCount:
      course.reserveCount +
        Math.floor(Math.random() * 102000001) +
        50 * Math.floor(Math.random() * 132123121) +
        50 || 0,

    rawData: course, // نگهداری داده اصلی برای دسترسی احتمالی
  }));
};

const calculateAverageCostByType = (courses) => {
  const typeMap = {}; // ذخیره جمع هزینه و تعداد برای هر نوع

  courses.forEach((course) => {
    const type = course.typeName; // نوع دوره (مثلاً "آنلاین"، "حضوری" یا هر نوع دیگر)
    const cost = parseFloat(course.cost);

    if (!typeMap[type]) {
      typeMap[type] = { total: 0, count: 0 };
    }

    typeMap[type].total += cost;
    typeMap[type].count++;
  });

  // محاسبه میانگین برای هر نوع
  const result = {};
  Object.keys(typeMap).forEach((type) => {
    result[type] = (typeMap[type].total / typeMap[type].count).toFixed(2);
  });

  return result;
};
export const appDashboardSlice = createSlice({
  name: "appDashboard",
  initialState: {
    reports: [],
    teachersReport: [],
    techReports: [],
    courses: [],
    coursesLike: [],
    mostExpensiveCourse: [],
    notReserveCoursePercent: [],
    filteredCourse: [],
    courseChart: [],
    bestCostInGroup: [],
    avrageCostEachType: [],
    percentOfReserveAndNotReserve: [],
    teachers: [],
    mostReserveCourse: [],
    bestCost: null,
    mostReserve: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDashboardReports.fulfilled, (state, action) => {
        state.reports = action.payload;
        state.loading = false;
      })
      .addCase(getDashboardReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getDashboardTechReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDashboardTechReports.fulfilled, (state, action) => {
        state.techReports = action.payload;
        state.loading = false;
      })
      .addCase(getDashboardTechReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getDashboardCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDashboardCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.loading = false;
        state.chartData = transformCourseData(action.payload.courseDtos);
        // 1. گرفتن 3 دوره گران‌ترین
        const mostExpensive = action.payload.courseDtos
          .sort((a, b) => b.cost - a.cost)
          .slice(0, 3)
          .map((col) => {
            // 2. پیدا کردن میانگین نوع خودش
            const ownType = state.avrageCostEachType?.find(
              (item) => item.typeName === col.typeName
            );
            const ownAvg = ownType ? ownType.averageCost : 1;

            // 3. نسبت قیمت به میانگین
            const ratio = col.cost / ownAvg;

            return {
              ...col,
              ratioToAvg: ratio, // می‌تونی این رو بعداً برای آیکون و رنگ استفاده کنی
            };
          });

        // 4. ذخیره در state
        state.mostExpensiveCourse = mostExpensive;

        // فقط ۲۰ رکورد اول را در نظر بگیرید (حتی اگر بیشتر باشند)
        const limitedCourses = action.payload.courseDtos.slice(0, 20);

        // تبدیل رکوردهای محدودشده به فرمت مورد نظر
        state.filteredCourse = limitedCourses.map((course) => ({
          price:
            typeof course.cost === "string"
              ? parseInt(course.cost.replace(/,/g, ""), 10) // تبدیل "100,000" به 100000
              : course.cost, // اگر عدد است، مستقیم استفاده کنید
          countLike: Number(course.reserveCount) || 0,
        }));

        // محاسبه بیشترین قیمت و بیشترین رزرو از filteredCourse (داده‌های تبدیل‌شده)
        state.bestCost =
          state.filteredCourse.length > 0
            ? Math.max(...state.filteredCourse.map((course) => course.price))
            : 0;

        state.mostReserve =
          state.filteredCourse.length > 0
            ? Math.max(
                ...state.filteredCourse.map((course) => course.countLike)
              )
            : 0;

        //پیدا کردن پر در امد ترین در هر لول
        state.bestCostInGroup = Object.entries(
          action.payload.courseDtos.reduce((groups, course) => {
            const level = course.levelName;
            if (!groups[level]) {
              groups[level] = [];
            }
            groups[level].push(course);
            return groups;
          }, {})
        ).map(([level, courses]) => {
          const courseWithMaxRevenue = courses.reduce((maxCourse, current) => {
            const currentRevenue =
              parseFloat(current.cost) * current.reserveCount;
            const maxRevenue =
              parseFloat(maxCourse.cost) * maxCourse.reserveCount;
            return currentRevenue > maxRevenue ? current : maxCourse;
          });

          return {
            level,
            ...courseWithMaxRevenue,
            bestInLevel:
              parseFloat(courseWithMaxRevenue.cost) *
              courseWithMaxRevenue.reserveCount,
          };
        });
        //میانگین قیمتی هر نوع کلاس
        state.avrageCostEachType = calculateAverageCostByType(
          action.payload.courseDtos
        );
        const courses = action.payload.courseDtos;

        // فقط دوره‌هایی که رزرو ندارند
        const noReserveCourses = courses.filter(
          (course) => parseInt(course.reserveCount, 10) === 0
        );

        // تعداد کل دوره‌های بدون رزرو
        const totalNoReserve = noReserveCourses.length || 1; // جلوگیری از تقسیم بر صفر

        // گروه‌بندی بر اساس سطح (levelName)
        const levelCounts = {};
        noReserveCourses.forEach((course) => {
          const level = course.levelName || "نامشخص";
          levelCounts[level] = (levelCounts[level] || 0) + 1;
        });

        // تبدیل به آرایه با درصد
        state.notReserveCourseByLevel = Object.entries(levelCounts).map(
          ([levelName, count]) => ({
            levelName,
            percent: Math.round((count / totalNoReserve) * 100),
          })
        );
        // محاسبه درصد رزرو و عدم رزرو

        const totalCourses = action.payload.courseDtos.length;
        const reservedCourses = action.payload.courseDtos.filter(
          (course) => parseInt(course.reserveCount) > 0
        ).length;
        const notReservedCourses = totalCourses - reservedCourses;

        state.percentOfReserveAndNotReserve = {
          reservedPercent: ((reservedCourses / totalCourses) * 100).toFixed(1),
          notReservedPercent: (
            (notReservedCourses / totalCourses) *
            100
          ).toFixed(1),
        };
        state.mostReserveCourse = action.payload.courseDtos
          .sort((a, b) => b.reserveCount - a.reserveCount)
          .slice(0, 3);
      })
      .addCase(getDashboardCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getLandingReports.fulfilled, (state, action) => {
        state.teachersReport = action.payload;
        state.loading = false;
      })
      .addCase(getLandingReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getLandingReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTeacherReport.fulfilled, (state, action) => {
        state.teachers = action.payload
          .sort((a, b) => {
            return a.courseCounts > b.courseCounts ? -1 : 1;
          })
          .slice(0, 6);
        state.loading = false;
      })
      .addCase(getTeacherReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getTeacherReport.pending, (state) => {
        state.loading = true;
      });
  },
});

export default appDashboardSlice.reducer;
