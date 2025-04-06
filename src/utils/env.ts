interface EnvConfig {
  appName: string;
  appVersion: string;
  apiUrl: string;
  apiTimeout: number;
  enableAnalytics: boolean;
  enableLogging: boolean;
  enableDevTools: boolean;
}

const env: EnvConfig = {
  appName: import.meta.env.VITE_APP_NAME || "Dynamic Form Builder",
  appVersion: import.meta.env.VITE_APP_VERSION || "1.0.0",
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT) || 5000,
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
  enableLogging: import.meta.env.VITE_ENABLE_LOGGING !== "false",
  enableDevTools: import.meta.env.VITE_ENABLE_DEVTOOLS === "true",
};

export const getEnvVar = <K extends keyof EnvConfig>(key: K): EnvConfig[K] => {
  const value = env[key];
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

export default env;
