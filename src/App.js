import React, { Component } from 'react';

//Pages/Containers
import DiscussionPage from './containers/DiscussionPage';
import MyDiscussionsPage from './containers/MyDiscussionsPage';
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

    // Check if sessionToken expired
    let isValidLogin = false
    if (localStorage['loggedIn'] === "true") {
      isValidLogin = !checkIfExpired(JSON.parse(localStorage['authUser']).expiresAt)
      if (!isValidLogin){
        localStorage.removeItem('authUser')
        localStorage.removeItem('loggedIn')
      }
    }

    this.state = {
      authUser: localStorage['loggedIn'] === "true"? JSON.parse(localStorage['authUser']) : null,
      loggedIn: isValidLogin
    };
  }

  handleGetUser = (id, token, expiresAt) => {
    if (id !== null) {
      API.getUserById(id)
      .then(result =>{
        this.setState({
          authUser: {
            id: id,
            name: result.name,
            token: token,
            expiresAt: expiresAt,
            imageUrl: result.imageUrl
          },
          loggedIn: true
        })
        localStorage.setItem('authUser', JSON.stringify(this.state.authUser))
        localStorage.setItem('loggedIn', true)
      })
    } else {
      localStorage.removeItem('authUser');
      localStorage.removeItem('loggedIn');
      this.setState({ authUser: null, loggedIn: false })
    }
  }

  render() {

    const BlankContainer = () => (
      <div className="container">
        <Route exact path="/authorize" render={(props)=><AuthorizePage {...props} getUserId={this.handleGetUser}/>}/>
      </div>
    )


   const WithNavbarContainer = () => (
      <div className="container">
        <MainMenuNavbar getUserId={this.handleGetUser}/>
        <div>
          <Route exact path="/" component={MyDiscussionsPage}/>
          <Route exact path="/discussion/:id" render={(props)=><DiscussionPage {...props} setCurrentDiscussion={this.handleSetCurrentDiscussion}/>}/>
          <Route exact path="/my_discussions" component={MyDiscussionsPage} />
        </div>
      </div>
   )

    return (
      <div>
        <AuthContext.Provider value={this.state}>
          <BrowserRouter>
            <div>
              <Route exact path="/authorize" component={BlankContainer}/>
              <Route component={WithNavbarContainer}/>
            </div>
          </BrowserRouter>
        </AuthContext.Provider>
      </div>
    );
  }
}

export default App;
