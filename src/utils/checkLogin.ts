export type User = {
  username: string;
  password: string;
};

const USER_LIST: User[] = [
  {
    username: 'mujay',
    password: '111111',
  },
];

type CheckLoginFunc = (username: User) => Promise<User | null>;

export const checkLogin: CheckLoginFunc = async ({ username, password }) => {
  const user = USER_LIST.find((user) => user.username === username);
  const correctPassword = user?.password === password;

  if (!user) {
    throw new Error('username belum terdaftar');
  }
  if (!correctPassword) {
    throw new Error('password salah');
  }
  return user;
};
