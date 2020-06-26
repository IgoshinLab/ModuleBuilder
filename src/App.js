import React from 'react';
import './index.css';
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

export default App;
