import axios from "axios";
import instance from "../axiosInstance";

export const getDashboardReport = async () => {
  try {
    const response = await instance.get("/Report/DashboardReport");
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const getTechnologyReports = async () => {
  try {
    const response = await instance.get("/Report/DashboardTechnologyReport");
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getLandingReportsApi = async () => {
  try {
    const response = await instance.get("/Home/LandingReport");
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// تابع بهبودیافته برای تحلیل استراتژی فروش با AI
export const getSalesStrategyAnalysis = async (
  coursesData,
  bestCostInGroup,
  avrageCostEachType
) => {
  const OPENROUTER_API_KEY =
    "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";

  try {
    // ساختار پیام بهینه‌شده برای تحلیل دقیق‌تر
    const messages = [
      {
        role: "system",
        content:
          "شما یک تحلیلگر حرفه‌ای فروش دوره‌های آموزشی هستید. داده‌های کامل دوره‌ها به شما ارائه می‌شود و شما باید تحلیل دقیق و راهکارهای عملی برای بهینه‌سازی فروش ارائه دهید.",
      },
      {
        role: "user",
        content: `با تحلیل داده‌های زیر، یک استراتژی فروش دقیق ارائه دهید که شامل:
        1. تحلیل قیمت‌گذاری بهینه بر اساس تعداد ثبت‌نام‌ها
        2. مقایسه عملکرد دوره‌های آنلاین و حضوری
        3. پیشنهاد قیمت برای هر نوع دوره
        4. شناسایی دوره‌های پرتقاضا و کم‌تقاضا
        5.پیشنهاد الگو های فروش برای دوره‌های مختلف
        5. 3 پیشنهاد عملی برای افزایش فروش
        داده‌های دوره‌ها:
        ${JSON.stringify(coursesData, null, 2)}
        داده‌های بهترین درآمد در گروه:
        ${JSON.stringify(bestCostInGroup, null, 2)}
        داده‌های میانگین هزینه هر نوع دوره:
        ${JSON.stringify(avrageCostEachType, null, 2)}`,
      },
    ];

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages,
        temperature: 0.7, // برای تعادل بین خلاقیت و دقت
        max_tokens: 1500, // برای دریافت پاسخ کامل
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "YOUR_SITE_URL", // اختیاری
          "X-Title": "Your App Name", // اختیاری
        },
      }
    );

    const analysisResult = response.data.choices[0]?.message?.content;
    console.log("AI Analysis Result:", analysisResult);
    return analysisResult;
  } catch (error) {
    console.error(
      "Error in AI analysis:",
      error.response?.data || error.message
    );
    throw new Error("Failed to get AI analysis");
  }
};

export const getSellAnalysis = async (coursesData) => {
  const OPENROUTER_API_KEY =
    "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";

  try {
    // ساختار پیام بهینه‌شده برای تحلیل دقیق‌تر
    const messages = [
      {
        role: "system",
        content: `شما یک تحلیل‌گر تعامل کاربران با دوره‌های آموزشی هستید. وظیفه شما تحلیل رزرو کاربران، میزان جذابیت دوره، اثرگذاری ویژگی‌ها مانند سطح، نوع، فعال بودن و... بر تعامل کاربران است.`,
      },
      {
        role: "user",
        content: `بر اساس داده‌های زیر، لطفاً موارد زیر را تحلیل کنید:

      1. کدام ویژگی‌ها (مثلاً سطح، نوع دوره، فعال یا غیرفعال بودن، تاریخ آپدیت، توضیحات) باعث افزایش یا کاهش رزرو شده‌اند؟
      2. آیا دوره‌هایی با وضعیت غیرفعال یا تصویر نداشتن، رزرو کمتر دارند؟
      3. چگونه می‌توان تعامل کاربران را در دوره‌های کم‌رزرو افزایش داد؟
      4. نقش عنوان و توضیحات دوره در جذابیت آن چیست؟
      5. ۳ پیشنهاد کاربردی برای بهبود نرخ رزرو دوره‌های آنلاین و حضوری

      داده نمونه:
      ${JSON.stringify(coursesData, null, 2)}
      `,
      },
    ];

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages,
        temperature: 0.7, // برای تعادل بین خلاقیت و دقت
        max_tokens: 1500, // برای دریافت پاسخ کامل
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "YOUR_SITE_URL", // اختیاری
          "X-Title": "Your App Name", // اختیاری
        },
      }
    );

    const analysisResult = response.data.choices[0]?.message?.content;
    console.log("AI Analysis Result:", analysisResult);
    return analysisResult;
  } catch (error) {
    console.error(
      "Error in AI analysis:",
      error.response?.data || error.message
    );
    throw new Error("Failed to get AI analysis");
  }
};
