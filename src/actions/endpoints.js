const PREFIX = process.env.BACKEND_API || 'http://localhost:5000';

export const REGISTER_URL = PREFIX + '/authentication/register';
export const LOGIN_URL = PREFIX + '/authentication/login';
