import React from 'react'
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootStore } from '../store';
// import _ from 'lodash'

interface Props {

}

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const isAuthed = useSelector((state: RootStore) => state.user.isLoaded)

  return (
    <Route
      // {...rest}
      render={({ location }) =>
        isAuthed ? (
          <Route {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/auth",
                state: { from: location }
              }}
            />
          )
      }
    />
  )
}

export default PrivateRoute
