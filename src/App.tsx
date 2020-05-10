import React, { useState, useCallback } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { Users } from "./user/pages/Users";
import { NewPlace } from "./places/pages/NewPlace/NewPlace";
import { MainNavigation } from "./common/components/Navigation/MainNavigation/MainNavigation";
import { UserPlaces } from "./places/pages/UserPlaces";
import { UpdatePlace } from "./places/pages/UpdatePlace";
import { Auth } from "./auth/pages/Auth";
import { AuthContext } from "./common/context/auth-context";

const App = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" component={Users} exact />
        <Route path="/:userId/places" component={UserPlaces} exact />
        <Route path="/places/new" component={NewPlace} exact />
        <Route path="/places/:placeId" component={UpdatePlace} exact />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" component={Users} exact />
        <Route path="/:userId/places" component={UserPlaces} exact />
        <Route path="/auth" component={Auth} exact />
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
