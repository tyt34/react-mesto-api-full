import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (data) => {
  const Component = () => { // а еще короче это записать можно?
    return (
      data.component.props.children
    )
  }

  return (
    <Route>
      {
        () => data.loggedIn === true ? <Component {...data} /> : <Redirect to="/sign-in" />
      }
    </Route>
  )
}

export default ProtectedRoute;
