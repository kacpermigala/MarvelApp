import React from 'react';
import Container from '@material-ui/core/Container';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import CharactersList from './Components/CharactersList';
import CharacterProfile from './Components/CharacterProfile';
import NotFound from './Components/NotFound';

function App() {
  return (
    <Container className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={CharactersList} />
          <Route path="/character/:id" exact component={CharacterProfile} />
          <Route path="/404" component={NotFound} />
          <Redirect from="*" to="/404" />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
