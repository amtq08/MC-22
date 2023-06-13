import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const SalesManagerRoute = ({ component: Component, designation, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      designation === 'sales' ? (
        <Component {...props} />
      ) : (
        <Redirect to="/landingpage" /> // Redirect to login page or an unauthorized page
      )
    }
  />
);

export default SalesManagerRoute;
