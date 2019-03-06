import React, { Component } from 'react';

//API
import API from '../../services/api/app';

//Components
import { GoogleLogin, GoogleLogout } from 'react-google-login';

//UI framework
import { Button } from 'semantic-ui-react';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clientId: '92526793961-oujhblthl5mck9mu282mkqgelqje1ur9.apps.googleusercontent.com',
      is_logged_in: false,
      user_id: null,
      session_token: '',
      session_token_expires_at: ''
    };
  }

  responseSuccessGoogle = (response) => {
    API.varifyGoogleTokenId({id_token: response.tokenId})
      .then(result => {
        this.props.getUserId(result.user_id, result.session_token, result.session_token_expires_at)

        this.setState({
          is_logged_in: true,
          user_id: result.user_id,
          session_token: result.session_token,
          session_token_expires_at: result.session_token_expires_at
        });
      })
  }

  responseFailureGoogle = (response) => {
    console.log(response);
  }

  logout = () => {
    this.props.getUserId(null,'','')

    this.setState({
      is_logged_in: false,
      user_id: null,
      session_token: '',
      session_token_expires_at: ''
    });
  }

  isExpired() {// false if expired or not registered
    if(this.state.session_token_expires_at !== '')
      return (new Date(this.state.session_token_expires_at) > new Date())
    return false
  }

  render() {
    let buttonLogin;

    if (!this.state.is_logged_in && this.isExpired) {
      buttonLogin = (
        <GoogleLogin
          clientId={this.state.clientId}
          render={renderProps => (
            <Button as='a' inverted primary={false} style={{ marginLeft: '0.5em' }} onClick={renderProps.onClick}>
              Accede con Google
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
    }

    return (
      <div>
        {buttonLogin}
      </div>
    );
  }
}

export default Login;
