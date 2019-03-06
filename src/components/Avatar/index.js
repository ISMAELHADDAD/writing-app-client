import React, { Component } from 'react';

//API
import API from '../../services/api/app';

// React Context API
import AuthContext from "../../AuthContext";

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
    API.getUserById(this.props.avatar.assigned_to_UserID)
    .then(result =>{
      this.setState({
        user: {
          name: result.name,
          image_url: result.image_url
        }
      })
    })
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
              <img src={this.state.user.image_url} alt=''/>
              @{this.state.user.name}
              {this.context.logged_in &&
                <Icon name='delete' />
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
