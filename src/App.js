import React, { Component } from 'react';

//Pages/Containers
import DiscussionPage from './containers/DiscussionPage';
import AuthorizePage from './containers/AuthorizePage';

//Components
import MainMenuNavbar from './components/MainMenuNavbar';

//React Context API
import AuthContext from "./AuthContext";

//API
import API from './services/api/app';

//Helpers
import { checkIfExpired } from './helpers/AuthHelper';

//Routing
import { BrowserRouter, Route } from 'react-router-dom';


class App extends Component {

  constructor(props) {
    super(props);

    // Check if session_token expired
    let is_valid_login = false
    if (localStorage['logged_in'] === "true") {
      is_valid_login = !checkIfExpired(JSON.parse(localStorage['authUser']).expires_at)
      if (!is_valid_login){
        localStorage.removeItem('authUser')
        localStorage.removeItem('logged_in')
      }
    }

    this.state = {
      authUser: localStorage['logged_in'] === "true"? JSON.parse(localStorage['authUser']) : null,
      logged_in: is_valid_login
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
          <BrowserRouter>
            {!(window.location.pathname === '/authorize') && //Hide MainMenuNavbar on authorize
            <MainMenuNavbar getUserId={this.handleGetUser}/>}
            <div>
              <Route exact path="/" component={DiscussionPage}/>
              <Route exact path="/discussion/:id" component={DiscussionPage} />
              <Route exact path="/authorize" render={(props)=><AuthorizePage {...props} getUserId={this.handleGetUser}/>}/>
            </div>
          </BrowserRouter>
        </AuthContext.Provider>
      </div>
    );
  }
}

export default App;
