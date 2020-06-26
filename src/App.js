import React from 'react';
import './index.css';
import PropTypes from 'prop-types';
import {Landing} from './components/builder/landing';

class App extends React.Component {

  render() {
    return (
          <div style={{height:'100%'}}>
              <Landing />
          </div>
    )
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default App;
