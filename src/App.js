import React from 'react';
import './index.css';
import PropTypes from 'prop-types';
import {Landing} from './components/builder/landing';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

class App extends React.Component {

  render() {
    return (
        <Router>
          <div style={{height:'100%'}}>
            <Switch>
              <Route exact path="/" component={Landing} />
            </Switch>
          </div>
        </Router>
    )
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default App;
