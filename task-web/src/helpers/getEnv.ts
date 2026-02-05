export const getEnv = () => {
  return {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_APP_URL: import.meta.env.VITE_APP_URL,
    VITE_REVERB_APP_KEY: import.meta.env.VITE_REVERB_APP_KEY,
    VITE_REVERB_CLUSTER: import.meta.env.VITE_REVERB_CLUSTER,
    VITE_REVERB_HOST: import.meta.env.VITE_REVERB_HOST,
    VITE_REVERB_PORT: import.meta.env.VITE_REVERB_PORT,
    VITE_REVERB_SCHEME: import.meta.env.VITE_REVERB_SCHEME,
  };
};
