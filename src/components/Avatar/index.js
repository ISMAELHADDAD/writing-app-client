import React, { Component } from 'react';

//Images
import gender from '../../gender.png'

//API
import API from '../../services/api/app';

//UI framework
import { Card, Icon, Image, Label } from 'semantic-ui-react'

class Avatar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    //API calls here
    this.setState({user: API.getUserById(this.props.avatar.assigned_to_UserID)});
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
              <img src='https://react.semantic-ui.com/images/avatar/small/ade.jpg' />
              @{this.state.user.name}
              <Icon name='delete' />
            </Label>
          </Card.Content>
        </Card>
        <br/>
      </div>
    );
  }
}

export default Avatar;
