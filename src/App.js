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
      authUser: {
        id: null,
        name: '',
        token: '',
        expires_at: '',
        image_url: ''
      }
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
          }
        })
      })
    } else {
      this.setState({
        authUser: {
          id: null,
          name: '',
          token: '',
          expires_at: '',
          image_url: ''
        }
      })
    }
  }

  render() {
    return (
      <div>
        <AuthContext.Provider value={this.state.authUser}>
          <MainMenuNavbar getUserId={this.handleGetUser}/>
          <DiscussionPage id='1'/>
        </AuthContext.Provider>
      </div>
    );
  }
}

export default App;
