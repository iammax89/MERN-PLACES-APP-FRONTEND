import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: "",
  token: "",
  login: (uId: null | string, token: null | string) => {},
  logout: () => {},
});
