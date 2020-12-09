import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Initial from './container/Initial'
import ErrorHandling from "./container/ErrorHandling"
import PrivateRoute from "./container/PrivateRoute";
import Auth from "./pages/Auth";
import Front from "./pages/Front";
import Profile from "./pages/Profile";
import BackDrop from './components/Backdrop';
import Post from './pages/Post';
import PostEdit from './pages/PostEdit';

function App() {
  return (
    <Router>
      <Initial>
        <ErrorHandling>
          <Layout>
            <Switch>
              <PrivateRoute path="/posts/:id/edit" component={PostEdit} />
              <Route path="/posts/:id" component={Post} />
              <PrivateRoute path="/profile" component={Profile} />
              <Route path="/auth" component={Auth} />
              <Route path="/" component={Front} />
            </Switch>
          </Layout>

          <BackDrop />
        </ErrorHandling>
      </Initial>
    </Router>
  );
}

export default App;
