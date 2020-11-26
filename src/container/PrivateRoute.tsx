import React from 'react'
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootStore } from '../store';
// import _ from 'lodash'

interface Props {

}

const PrivateRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
  const isAuthed = useSelector((state: RootStore) => state.user.isLoaded)

  // const rest = _.omit(props, ['component'])
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthed ? (
          component
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
