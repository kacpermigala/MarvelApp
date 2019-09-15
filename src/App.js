import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import CharactersList from './Components/CharactersList';
import CharacterProfile from './Components/CharacterProfile';
import NotFound from './Components/NotFound';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import Layout from './Components/Layout';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Switch>
          <Layout>
            <Route path="/" exact component={CharactersList} />
            <Route path="/character/:id" exact component={CharacterProfile} />
            <Route path="/404" component={NotFound} />
            <Redirect from="*" to="/404" />
          </Layout>
        </Switch>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
