import React, { Component } from 'react';

//API
import API from '../../services/api/app';

// React Context API
import AuthContext from "../../AuthContext";

//UI framework
import { Icon, Button, Popup, Header, Input } from 'semantic-ui-react';

class InviteButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      emailText: '',
      emailError: false,
      isInvitationSend: false
    };
  }

  handleOnChangeemailText = (event,data) => {
    this.setState({emailText: data.value, emailError: false})
  }

  handleOnClickInvite = (event, data) => {
    //Verify if email is valid
    if (this.state.emailText.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))
      API.inviteToParticipate(this.context.authUser.token, this.props.discussionId, {email: this.state.emailText})
      .then(result => {
        this.setState({isInvitationSend: true})
      })
    else
      this.setState({emailError: true})
  }

  render() {
    return (
      <div>
        <Popup
          hideOnScroll
          trigger={
            <Button icon fluid={this.props.fluid} labelPosition='left' primary size='small'>
              <Icon name='add user' /> Invitar
            </Button>}
          position='bottom center'
          on='click'
        >
          {this.state.isInvitationSend &&
            <Header icon>
              <Icon color='green' name='checkmark' size='massive' />
              Invitación enviada
            </Header>
          }
          {!this.state.isInvitationSend &&
          <div style={{textAlign: 'center'}}>
            <Header icon>
              <Icon name='user plus' />
              Invitar a participar
            </Header>
            <Input label='Email' placeholder='tuemail@ejemplo.org' error={this.state.emailError} onChange={this.handleOnChangeemailText}/>
            <br/>
            <br/>
            <Button primary onClick={this.handleOnClickInvite}>Invitar</Button>
          </div>}
        </Popup>
      </div>
    );
  }
}

InviteButton.contextType = AuthContext

export default InviteButton;
