export type User = {
  id: string;
  username: string;
  fullname: string;
  description: string;
  email: string;
  emailVerified: boolean;
  tags: string;
  password: string;
  otpSecret?: string | null;
  otpVerified: boolean;
};

export type SessionUser = {
  id: string;
  username: string;
  fullname: string;
  description: string;
  email: string;
  tags: string;
};

export type SessionType = {
  user: SessionUser;
  otpLoggedIn: boolean;
};

export type Invite = {
  id: string;
  email: string;
};

export type EmailVerification = {
  id: string;
  email: string;
  code: string;
};