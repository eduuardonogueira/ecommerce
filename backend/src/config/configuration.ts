export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.BACKEND_PORT, 10) || 3001,
});
