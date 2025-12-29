const USERNAME_KEY = "user_name";
const USER_ID_KEY = "user_id";

export const session = {
  getUserName: () => localStorage.getItem(USERNAME_KEY),
  setUserName: (v: string) => localStorage.setItem(USERNAME_KEY, v),

  getUserId: () => localStorage.getItem(USER_ID_KEY),
  setUserId: (v: string) => localStorage.setItem(USER_ID_KEY, v),

  clear: () => {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(USER_ID_KEY);
  },
};
