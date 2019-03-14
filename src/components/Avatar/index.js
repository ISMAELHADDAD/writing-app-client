import React, { Component } from 'react';

//API
import API from '../../services/api/app';

// React Context API
import AuthContext from "../../AuthContext";

//UI framework
import { Row, Col } from 'react-grid-system';
import { Card, Icon, Image, Label, Button, Popup, Divider, Header, Dropdown, Input } from 'semantic-ui-react'

class Avatar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isAssigned: false,
      participantSelect: [],
      emailText: '',
      emailError: false,
      isInvitationSend: false,
      idToAssign: 0
    };
  }

  handleOnRemove = (event,data) => {
    this.setState({isAssigned: false})
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
        //TODO Maybe in DiscussionPage?? in order to add the participant id??
      })
    else
      this.setState({emailError: true})
  }

  handleOnChangeAssignDropdown = (event,data) => {
    this.setState({idToAssign: data.value})
  }

  handleOnClickAssignButton = (event,data) => {
    API.assignAvatar(this.context.authUser.token, this.props.discussionId, this.props.avatar.id, {user_id: this.state.idToAssign})
    .then(result => {
      API.getUserById(this.props.avatar.assignedToUserId)
      .then(result =>{
        this.setState({
          user: {
            name: result.name,
            imageUrl: result.imageUrl
          },
          isAssigned: true
        })
      })
    })
  }

  componentDidMount() {
    //Get User assigned for this avatar
    API.getUserById(this.props.avatar.assignedToUserId)
    .then(result =>{
      this.setState({
        user: {
          name: result.name,
          imageUrl: result.imageUrl
        },
        isAssigned: true
      })
    })

    //Populate participantSelect
    this.props.participantsIds.forEach(id => {
      API.getUserById(id)
      .then(result =>{
        let newParticipant = {
          key: id,
          text: result.name,
          value: id,
          image: {
            avatar: true,
            src: result.imageUrl}
        }

        this.setState({
          participantSelect: [...this.state.participantSelect, newParticipant],
          idToAssign: this.props.avatar.assignedToUserId
        })
      })
    })
  }

  render() {

    let userAssigned
    if (this.state.isAssigned) {
      userAssigned =
        <Label image>
          <img src={this.state.user.imageUrl} alt=''/>
          @{this.state.user.name}
          {this.context.loggedIn &&
            <Icon name='delete' onClick={this.handleOnRemove}/>
          }
        </Label>
    } else if (this.context.loggedIn) {
      userAssigned =
        <Popup
          flowing
          trigger={
            <Button icon>
              <Icon name='add' />
            </Button>}
          position='bottom center'
          on='click'
        >
          <Divider vertical>O</Divider>

          <Row>
            <Col sm={6} style={{textAlign: 'center'}}>
              <Header icon>
                <Icon name='tag' />
                Asignar a un participante
              </Header>

              <Dropdown
                placeholder='Selecciona participante'
                fluid
                selection
                options={this.state.participantSelect}
                onChange={this.handleOnChangeAssignDropdown}
              />
              <br/>
              <Button primary onClick={this.handleOnClickAssignButton}>Asignar</Button>
            </Col>

            <Col sm={6} style={{textAlign: 'center'}}>
              {this.state.isInvitationSend &&
                <Header icon>
                  <Icon color='green' name='checkmark' size='massive' />
                  Invitación enviada
                </Header>
              }
              {!this.state.isInvitationSend &&
                <div>
                  <Header icon>
                    <Icon name='user plus' />
                    Invitar a participar
                  </Header>
                  <Input label='Email' placeholder='tuemail@ejemplo.org' error={this.state.emailError} onChange={this.handleOnChangeemailText}/>
                  <br/>
                  <br/>
                  <Button primary onClick={this.handleOnClickInvite}>Invitar</Button>
                </div>}
            </Col>
          </Row>
        </Popup>
    }

    return (
      <div>
        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' size='small' circular centered/>
        <Card fluid>
          <Card.Content>
            <Card.Header>{this.props.avatar.name}</Card.Header>
            <Card.Description>{this.props.avatar.opinion}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            {userAssigned}
          </Card.Content>
        </Card>
        <br/>
      </div>
    );
  }
}

Avatar.contextType = AuthContext

export default Avatar;
