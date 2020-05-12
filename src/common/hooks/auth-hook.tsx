import { useState, useCallback, useEffect } from "react";

let logoutTimer: ReturnType<typeof setTimeout>;
export const useAuth = () => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [tokenExpirationDate, setTokenExpirationDate] = useState<Date>();
  const login = useCallback((uid, token, expDate?) => {
    setToken(token);
    setUserId(uid);
    const tokenExpDate =
      expDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        tokenExpDate: tokenExpDate.toLocaleString(),
      })
    );
  }, []);
  const logout = useCallback(() => {
    setToken("");
    setUserId("");
    setTokenExpirationDate(undefined);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      let remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData: any = localStorage.getItem("userData");
    if (storedData) {
      const userData = JSON.parse(storedData);
      if (userData && new Date(userData.tokenExpDate) > new Date())
        login(userData.userId, userData.token, new Date(userData.tokenExpDate));
    }
  }, [login]);
  return { login, logout, token, userId };
};
