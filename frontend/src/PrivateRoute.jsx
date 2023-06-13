

import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './Hooks/useAuth'; 
import { getUserRole } from './auth';


  

function PrivateRoute({ component: Component, allowedRoles, ...rest }) {
  const { isAuthenticated} = useAuth(); // Implement the useAuth hook according to your authentication library
  const userRole = getUserRole();// Import the useAuth hook from your authentication library
  // Check if the user is authenticated and has the allowed role
  const isAuthorized = isAuthenticated && allowedRoles.includes(userRole);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (allowedRoles.includes(userRole)) {
          return <Component {...props} />;
        } else {
          // Handle unauthorized access
          return <Redirect to="/" />;
        }
      }}
    />
  );
}
export default PrivateRoute;



