export type User = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
};

export type UserAuthState = {
  user: User | null;
  signUp: (user: User) => void;
  signOut: () => void;
};
