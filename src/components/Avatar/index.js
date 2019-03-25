import React, { Component } from 'react';

//API
import API from '../../services/api/app';

// React Context API
import AuthContext from "../../AuthContext";

//UI framework
import { Card, Icon, Image, Label, Button, Popup, Header, Dropdown } from 'semantic-ui-react'

class Avatar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {},
      isAssigned: false,
      participantSelect: [],
      idToAssign: 0
    };
  }

  handleOnRemove = (event,data) => {
    this.setState({isAssigned: false})
  }

  handleOnChangeAssignDropdown = (event,data) => {
    this.setState({idToAssign: data.value})
  }

  handleOnClickAssignButton = (event,data) => {
    API.assignAvatar(this.context.authUser.token, this.props.discussionId, this.props.avatar.id, {user_id: this.state.idToAssign})
    .then(result => {
      //Error control???
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
        isAssigned: true,
        idToAssign: this.props.avatar.assignedToUserId
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
          participantSelect: [...this.state.participantSelect, newParticipant]
        })
      })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.avatar !== this.props.avatar) {
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
    }
  }

  render() {
    return (
      <div>
        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' size='small' circular centered/>
        <Card fluid>
          <Card.Content>
            <Card.Header>{this.props.avatar.name}</Card.Header>
            <Card.Description>{this.props.avatar.opinion}</Card.Description>
          </Card.Content>
          <Card.Content extra>

            <Label image>
              <img src={this.state.user.imageUrl} alt=''/>
              @{this.state.user.name}
              {this.context.loggedIn && this.context.authUser.id === this.props.ownerUserId &&
                <Popup
                  open={!this.state.isAssigned}
                  trigger={<Icon name='delete' onClick={this.handleOnRemove}/>}
                  position='bottom center'
                  on='click'
                >
                  <div style={{textAlign: 'center'}}>
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
                  </div>
                </Popup>
              }
            </Label>

          </Card.Content>
        </Card>
        <br/>
      </div>
    );
  }
}

Avatar.contextType = AuthContext

export default Avatar;
