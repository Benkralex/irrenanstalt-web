export type User = {
  id: string;
  username: string;
  fullname: string;
  description: string;
  email: string;
  emailVerified: boolean;
  tags: string;
  password: string;
};

export type Invite = {
  id: string;
  email: string;
};