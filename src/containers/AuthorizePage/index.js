import React, { Component } from 'react';

import wallpaper from '../../authorize-wallpaper-1.jpg';

//API
import API from '../../services/api/app';

//Utils
import queryString from 'query-string';

//Components
import { GoogleLogin } from 'react-google-login';

//UI framework
import { Modal, Icon, Button, Header } from 'semantic-ui-react';

class AuthorizePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clientId: '92526793961-oujhblthl5mck9mu282mkqgelqje1ur9.apps.googleusercontent.com',
      discussionId: null,
      token: ''
    };
  }

  responseSuccessGoogle = (response) => {
    //Verify Google Account
    API.varifyGoogleTokenId({id_token: response.tokenId})
      .then(result => {
        //Verify Invitation
        API.verifyInvitation(
          result.sessionToken,
          this.state.discussionId,
          {token: this.state.token}
        )

        //Set up the user login
        this.props.getUserId(result.userId, result.sessionToken, result.sessionTokenExpiresAt)

        // Redirect to discussion page with id= this.state.discussionId
        this.props.history.push(`/discussion/${this.state.discussionId}`)
      })
  }

  responseFailureGoogle = (response) => {
    console.log(response);
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search)
    this.setState({discussionId: values.discussion_id, token: values.token})
  }

  render() {
    return (
      <div style={{backgroundImage: "url(" + wallpaper + ")", minHeight: '100vh'}}>
        <Modal dimmer={'blurring'} open={true} basic>
          <Header style={{textAlign: 'center'}}>Autorizando a Ideashub para acceder a Google</Header>
          <Modal.Content style={{textAlign: 'center'}}>
            <p>
              Para acceder a la discussion es necesario autorizarlo mediante una cuenta de Google.
            </p>
          </Modal.Content>
          <Modal.Actions style={{textAlign: 'center'}}>
            <GoogleLogin
              clientId={this.state.clientId}
              render={renderProps => (
                <Button color='green' inverted size='massive' onClick={renderProps.onClick}>
                  <Icon name='lock' /> Autorizar con Google
                </Button>
              )}
              buttonText="Login"
              onSuccess={this.responseSuccessGoogle}
              onFailure={this.responseFailureGoogle}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default AuthorizePage;
