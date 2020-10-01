const PREFIX = process.env.BACKEND_API || 'http://localhost:5000';

export const REGISTER_URL = PREFIX + '/public/register';
export const LOGIN_URL = PREFIX + '/public/login';
export const LOGOUT_URL = PREFIX + '/public/logout';

export const GET_USERS_URL = PREFIX + '/private/users';

export const GET_BOOKS_URL = PREFIX + '/private/books';
