import React, { lazy, Suspense } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { MainNavigation } from "./common/components/Navigation/MainNavigation/MainNavigation";
import { AuthContext } from "./common/context/auth-context";
import { useAuth } from "./common/hooks/auth-hook";
import Spinner from "./common/components/UIElements/Spinner/Spinner";

const Users = lazy(() => import("./user/pages/Users"));
const NewPlace = lazy(() => import("./places/pages/NewPlace/NewPlace"));
const UserPlaces = lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlace = lazy(() => import("./places/pages/UpdatePlace"));
const Auth = lazy(() => import("./auth/pages/Auth"));
const App = (): JSX.Element => {
  const { token, login, logout, userId } = useAuth();
  let routes;
  if (token) {
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
  const spinner = (
    <div className="center">
      <Spinner asOverlay />
    </div>
  );
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <Suspense fallback={spinner}>
          <main>{routes}</main>
        </Suspense>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
