/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import {
  BrowserRouter,
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import {
  About,
  Home,
  Login,
  NewChat,
  PrivateChat,
  Search,
  Settings
} from '../pages';

function PrivateRoute({ children, ...rest }) {
  const { isAuthenticated } = useAuth0();

  return (
    <Route
      {...rest}
      render={({ location }) => (isAuthenticated ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location }
          }}
        />
      ))}
    />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.element
};

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
