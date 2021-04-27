/* eslint-disable react/jsx-props-no-spreading */
import {
  BrowserRouter,
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { LinearProgress } from '@material-ui/core';
import {
  About,
  Home,
  Login,
  NewChat,
  PrivateChat,
  Search,
  Settings
} from '../pages';

function PrivateRoute({ ...rest }) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <LinearProgress />;
  }

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <Route {...rest} />
  );
}

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute component={Home} path="/" exact />
        <PrivateRoute component={Search} path="/search" />
        <PrivateRoute component={PrivateChat} path="/chat" exact />
        <PrivateRoute component={NewChat} path="/chat/new" />
        <PrivateRoute component={Settings} path="/settings" />
        <PrivateRoute component={About} path="/about" />
        <Route path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
