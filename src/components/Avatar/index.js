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
      is_assigned: false,
      participant_select: [],
      emailText: '',
      emailError: false,
      is_invitation_send: false
    };
  }

  handleOnRemove = (event,data) => {
    this.setState({is_assigned: false})
  }

  handleOnChangeEmailText = (event,data) => {
    this.setState({emailText: data.value, emailError: false})
  }

  handleOnClickInvite = (event, data) => {
    //Verify if email is valid
    if (this.state.emailText.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))
      API.inviteToParticipate(this.context.authUser.token, this.props.discussion_id, {email: this.state.emailText})
      .then(result => {
        this.setState({is_invitation_send: true})
        //TODO Maybe in DiscussionPage?? in order to add the participant id??
      })
    else
      this.setState({emailError: true})
  }

  componentDidMount() {
    //Get User assigned for this avatar
    API.getUserById(this.props.avatar.assigned_to_UserID)
    .then(result =>{
      this.setState({
        user: {
          name: result.name,
          image_url: result.image_url
        },
        is_assigned: true
      })
    })

    //Populate participant_select
    this.props.participants_ids.forEach(id => {
      API.getUserById(id)
      .then(result =>{
        let newParticipant = {
          key: id,
          text: result.name,
          value: id,
          image: {
            avatar: true,
            src: result.image_url}
        }

        this.setState({
          participant_select: [...this.state.participant_select, newParticipant]
        })
      })
    })
  }

  render() {

    let user_assigned
    if (this.state.is_assigned) {
      user_assigned =
        <Label image>
          <img src={this.state.user.image_url} alt=''/>
          @{this.state.user.name}
          {this.context.logged_in &&
            <Icon name='delete' onClick={this.handleOnRemove}/>
          }
        </Label>
    } else if (this.context.logged_in) {
      user_assigned =
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
                options={this.state.participant_select}
              />
              <br/>
              <Popup trigger={<Button primary>Asignar</Button>} position='bottom center'>
                <Icon name='ban'/> No disponible
              </Popup>
            </Col>

            <Col sm={6} style={{textAlign: 'center'}}>
              {this.state.is_invitation_send &&
                <Header icon>
                  <Icon color='green' name='checkmark' size='massive' />
                  Invitación enviada
                </Header>
              }
              {!this.state.is_invitation_send &&
                <div>
                  <Header icon>
                    <Icon name='user plus' />
                    Invitar a participar
                  </Header>
                  <Input label='Email' placeholder='tuemail@ejemplo.org' error={this.state.emailError} onChange={this.handleOnChangeEmailText}/>
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
            {user_assigned}
          </Card.Content>
        </Card>
        <br/>
      </div>
    );
  }
}

Avatar.contextType = AuthContext

export default Avatar;
