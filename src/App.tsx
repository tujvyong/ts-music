import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Initial from './container/Initial';
import Auth from "./pages/Auth";
import Front from "./pages/Front";

function App() {
  return (
    <Router>
      <Layout>
        <Initial>
          <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/" component={Front} />
          </Switch>
        </Initial>
      </Layout>
    </Router>
  );
}

export default App;
