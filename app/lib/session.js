export const sessionOptions = {
  password: process.env.SESSION_PASSWORD,
  cookieName: 'gadget_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
