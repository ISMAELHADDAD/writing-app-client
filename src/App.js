import React, { Component } from 'react';

//Pages/Containers
import DiscussionPage from './containers/DiscussionPage';

//Components
import MainMenuNavbar from './components/MainMenuNavbar';

// React Context API
import AuthContext from "./AuthContext";

//API
import API from './services/api/app';

import 'semantic-ui-css/semantic.min.css'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authUser: localStorage['logged_in'] === "true"? JSON.parse(localStorage['authUser']) : null,
      logged_in: localStorage['logged_in'] === "true"? true : false
    };
  }

  handleGetUser = (id, token, expires_at) => {
    if (id !== null) {
      API.getUserById(id)
      .then(result =>{
        this.setState({
          authUser: {
            id: id,
            name: result.name,
            token: token,
            expires_at: expires_at,
            image_url: result.image_url
          },
          logged_in: true
        })
        localStorage.setItem('authUser', JSON.stringify(this.state.authUser))
        localStorage.setItem('logged_in', true)
      })
    } else {
      localStorage.removeItem('authUser');
      localStorage.removeItem('logged_in');
      this.setState({ authUser: null, logged_in: false })
    }
  }

  render() {
    return (
      <div>
        <AuthContext.Provider value={this.state}>
          <MainMenuNavbar getUserId={this.handleGetUser}/>
          <DiscussionPage id='1'/>
        </AuthContext.Provider>
      </div>
    );
  }
}

export default App;
