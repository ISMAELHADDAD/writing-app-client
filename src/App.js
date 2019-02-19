import React, { Component } from 'react';
import DiscussionPage from './containers/DiscussionPage';

import 'semantic-ui-css/semantic.min.css'

class App extends Component {
  render() {
    return (
      <div>
        <DiscussionPage id='1'/>
      </div>
    );
  }
}

export default App;
