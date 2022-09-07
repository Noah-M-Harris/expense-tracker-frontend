import React, { startTransition } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import React from 'react'

const ProtectedRoute = ({component: Component, ...rest}) => {

  // Check to see if user is logged in
  const user = useSelector(state => state?.users?.userAuth)
  return (
    <Route {...rest} render={() => user ? <Component /> : <Redirect to='/login' />} />
  )
}

export default ProtectedRoute;
