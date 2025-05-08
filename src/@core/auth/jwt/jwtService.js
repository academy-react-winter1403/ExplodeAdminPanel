import jwtDefaultConfig from "./jwtDefaultConfig";
import instance from "../../axiosInstance"; // استفاده از instance موجود

export default class JwtService {
  constructor(jwtOverrideConfig) {
    // تنظیمات JWT
    this.jwtConfig = { ...jwtDefaultConfig, ...jwtOverrideConfig };

    // متغیرهای مدیریت توکن
    this.isAlreadyFetchingAccessToken = false;
    this.subscribers = [];

    // تنظیم اینترسپتورها
    this.setupInterceptors();
  }

  setupInterceptors() {
    // اینترسپتور درخواست
    instance.interceptors.request.use(
      (config) => {
        const accessToken = this.getToken();
        if (accessToken) {
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // اینترسپتور پاسخ
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const { config, response } = error;

        // فقط خطاهای 401 را مدیریت می‌کنیم
        if (response && response.status === 401 && !config._retry) {
          // اگر در حال رفرش توکن نیستیم
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true;
            config._retry = true;

            try {
              const { data } = await this.refreshToken();
              this.setToken(data.accessToken);
              this.setRefreshToken(data.refreshToken);

              // به روزرسانی هدر درخواست اصلی
              config.headers.Authorization = `${this.jwtConfig.tokenType} ${data.accessToken}`;

              // تکرار درخواست اصلی
              return instance(config);
            } catch (refreshError) {
              // اگر رفرش توکن ناموفق بود
              this.removeTokens();
              window.location.href = "/login"; // هدایت به صفحه لاگین
              return Promise.reject(refreshError);
            } finally {
              this.isAlreadyFetchingAccessToken = false;
            }
          }

          // اگر در حال رفرش توکن هستیم، درخواست را در صف قرار می‌دهیم
          return new Promise((resolve) => {
            this.addSubscriber((accessToken) => {
              config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
              resolve(instance(config));
            });
          });
        }

        return Promise.reject(error);
      }
    );
  }

  // مدیریت subscribers برای درخواست‌های در حال انتظار
  onAccessTokenFetched(accessToken) {
    this.subscribers.forEach((callback) => callback(accessToken));
    this.subscribers = [];
  }

  addSubscriber(callback) {
    this.subscribers.push(callback);
  }

  // مدیریت توکن‌ها
  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName);
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName);
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value);
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value);
  }

  removeTokens() {
    localStorage.removeItem(this.jwtConfig.storageTokenKeyName);
    localStorage.removeItem(this.jwtConfig.storageRefreshTokenKeyName);
  }

  // متدهای API
  login(...args) {
    return instance.post(this.jwtConfig.loginEndpoint, ...args);
  }

  register(...args) {
    return instance.post(this.jwtConfig.registerEndpoint, ...args);
  }

  refreshToken() {
    return instance.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken(),
    });
  }
}
