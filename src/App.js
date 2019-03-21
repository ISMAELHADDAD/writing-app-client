import React, { Component } from 'react';

//Pages/Containers
import FrontPage from './containers/FrontPage';
import DiscussionPage from './containers/DiscussionPage';
import DiscussionsPage from './containers/DiscussionsPage';
import AuthorizePage from './containers/AuthorizePage';

//Components
import MainMenuNavbar from './components/MainMenuNavbar';

//React Context API
import AuthContext from "./AuthContext";
import CurrentSessionContext from "./CurrentSessionContext";

//API
import API from './services/api/app';

//Helpers
import { checkIfExpired } from './helpers/AuthHelper';

//Routing
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';


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
      loggedIn: isValidLogin,
      currentDiscussion: 0
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

  handleGetDiscussionId = (id) => this.setState({ currentDiscussion: id })

  render() {
    return (
      <div>
        <AuthContext.Provider value={this.state}>
          <BrowserRouter>
            <CurrentSessionContext.Provider value={this.state.currentDiscussion}>
              {!window.location.pathname.includes('/authorize') && <MainMenuNavbar getUserId={this.handleGetUser} loggedIn={this.state.loggedIn}/>}
            </CurrentSessionContext.Provider>
            <div>
              <Switch>
                <Route exact path="/" render={(props)=> (
                    this.state.loggedIn ?
                    (<Redirect to='/my-discussions'/>) :
                    (<FrontPage {...props}/>)
                  )
                }/>
                <Route exact path="/authorize" render={(props)=><AuthorizePage {...props} getUserId={this.handleGetUser}/>}/>
                <Route path="/discussion/:id" render={(props)=><DiscussionPage {...props} getDiscussionId={this.handleGetDiscussionId}/>}/>
                <Route path="/my-discussions" render={(props)=><DiscussionsPage {...props} isMyDiscussions={true}/>} />
                <Route path="/explore" render={(props)=><DiscussionsPage {...props} isMyDiscussions={false}/>} />
              </Switch>
            </div>
          </BrowserRouter>
        </AuthContext.Provider>
      </div>
    );
  }
}

export default App;
