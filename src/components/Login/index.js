import React, { Component } from 'react';

//API
import API from '../../services/api/app';

//Components
import { GoogleLogin, GoogleLogout } from 'react-google-login';

// React Context API
import AuthContext from "../../AuthContext";

//UI framework
import { Button, Icon, Responsive } from 'semantic-ui-react';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clientId: '92526793961-oujhblthl5mck9mu282mkqgelqje1ur9.apps.googleusercontent.com',
    };
  }

  responseSuccessGoogle = (response) => {
    API.varifyGoogleTokenId({id_token: response.tokenId})
      .then(result => {
        this.props.getUserId(result.userId, result.sessionToken, result.sessionTokenExpiresAt)
      })
  }

  responseFailureGoogle = (response) => {
    console.log(response);
  }

  logout = () => {
    this.props.getUserId(null,'','')
  }

  render() {
    let buttonLogin;
    let mobileButtonLogin;

    if (!this.context.loggedIn) {
      buttonLogin = (
        <GoogleLogin
          clientId={this.state.clientId}
          render={renderProps => (
            <Button as='a' inverted primary={false} style={{ marginLeft: '0.5em' }} onClick={renderProps.onClick}>
              <Icon name='google' /> Accede con Google
            </Button>
          )}
          buttonText="Login"
          onSuccess={this.responseSuccessGoogle}
          onFailure={this.responseFailureGoogle}
        />
      )
      mobileButtonLogin = (
        <GoogleLogin
          clientId={this.state.clientId}
          render={renderProps => (
            <Button as='a' inverted primary={false} onClick={renderProps.onClick}>
              <Icon name='google' /> Acceder<br/>
            </Button>
          )}
          buttonText="Login"
          onSuccess={this.responseSuccessGoogle}
          onFailure={this.responseFailureGoogle}
        />
      )
    } else {
      buttonLogin = (
        <GoogleLogout
          clientId={this.state.clientId}
          render={renderProps => (
            <Button as='a' inverted primary={false} style={{ marginLeft: '0.5em' }} onClick={renderProps.onClick}>
              Cerrar sessión
            </Button>
          )}
          buttonText="Logout"
          onLogoutSuccess={this.logout}
        >
        </GoogleLogout>
      )
      mobileButtonLogin = (
        <GoogleLogout
          clientId={this.state.clientId}
          render={renderProps => (
            <Button as='a' inverted icon primary={false} onClick={renderProps.onClick}>
              <Icon name='sign out'/><br/>Cerrar sessión
            </Button>
          )}
          buttonText="Logout"
          onLogoutSuccess={this.logout}
        >
        </GoogleLogout>
      )
    }

    return (
      <div>
        <Responsive minWidth={770}>
          {buttonLogin}
        </Responsive>
        <Responsive maxWidth={771}>
          {mobileButtonLogin}
        </Responsive>
      </div>
    );
  }
}

Login.contextType = AuthContext

export default Login;
