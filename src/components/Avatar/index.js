import React, { Component } from 'react';
import gender from '../../gender.png'

import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Card, Media, Heading, Content } from 'react-bulma-components';

class Avatar extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div style={{backgroundColor: '#08B2E3', textAlign: 'center'}}>
        <img src={gender}/>
        <Card>
          <Card.Content style={{backgroundColor: 'rgba(53, 148, 204, 0.11)'}}>
            <Media>
              <Media.Item>
                <Heading size={4}>{this.props.avatar.name}</Heading>
                <Heading subtitle size={6}>asignado a: <a href="#">@{this.props.avatar.userAssigned}</a></Heading>
              </Media.Item>
            </Media>
            <Content style={{textAlign: 'left'}}>
              {this.props.avatar.opinion}
            </Content>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default Avatar;
