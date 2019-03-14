import React, { Component } from 'react';

//UI framework
import { Row, Col } from 'react-grid-system';
import { Card, Icon, Button, Rating } from 'semantic-ui-react'

class Argument extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    let speech;
    if (this.props.argument.fromAvatarId === this.props.avatarOneId) {
      speech = <Row>
                <Col sm={8}>
                  <Card fluid style={this.props.argument.highlight? {border: '4px solid yellow'}:null }>
                    <Card.Content>
                      <Card.Header>#{this.props.argument.num}</Card.Header>
                      <Card.Description>{this.props.argument.content}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Rating icon='star' defaultRating={0} maxRating={5} />
                      <Button basic floated='right'>
                        <Icon name='comment'/>
                        Comentarios
                      </Button>
                    </Card.Content>
                  </Card>
                </Col>
                <Col sm={4}></Col>
              </Row>
    } else {
      speech = <Row>
                <Col sm={4}></Col>
                <Col sm={8}>
                  <Card fluid style={this.props.argument.highlight? {border: '4px solid yellow'}:null }>
                    <Card.Content>
                      <Card.Header>#{this.props.argument.num}</Card.Header>
                      <Card.Description>{this.props.argument.content}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Rating icon='star' defaultRating={0} maxRating={5} />
                      <Button basic floated='right'>
                        <Icon name='comment'/>
                        Comentarios
                      </Button>
                    </Card.Content>
                  </Card>
                </Col>
              </Row>
    }

    return (
      <div>
        {speech}
        <br />
      </div>
    );
  }
}

export default Argument;
