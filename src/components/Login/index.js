import React, { Component } from 'react';

//API
import API from '../../services/api/app';

//Components
import { GoogleLogin } from 'react-google-login';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clientId: '249324161203-v91vkl0l6slv4913cp36km2jugdktrhl.apps.googleusercontent.com'
    };
  }

  responseSuccessGoogle = (response) => {
    API.varifyGoogleTokenId({id_token: response.tokenId})
      .then(result => {
        console.log(result)
      })
  }

  responseFailureGoogle = (response) => {
    console.log(response);
  }

  render() {
    return (
      <div>
        <GoogleLogin
          clientId={this.state.clientId}
          buttonText="Login"
          onSuccess={this.responseSuccessGoogle}
          onFailure={this.responseFailureGoogle}
        />
      </div>
    );
  }
}

export default Login;
