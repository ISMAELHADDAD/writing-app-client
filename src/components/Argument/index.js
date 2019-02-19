import React, { Component } from 'react';

//Images
import star from '../../star.svg'

//UI framework
import { Row, Col } from 'react-grid-system';
import { Card, Icon } from 'semantic-ui-react'

class Argument extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    let speech;
    if (this.props.argument.from_AvatarID === this.props.avatarOneID) {
      speech = <Row>
                <Col sm={8}>
                  <Card fluid>
                    <Card.Content>
                      <Card.Header>#{this.props.argument.num}</Card.Header>
                      <Card.Description>{this.props.argument.content}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Icon name='star' /><Icon name='star' /><Icon name='star' /><Icon name='star' /><Icon name='star' />
                      <a>
                        <Icon name='comment'/>
                        Comentarios
                      </a>
                    </Card.Content>
                  </Card>
                </Col>
                <Col sm={4}></Col>
              </Row>
    } else {
      speech = <Row>
                <Col sm={4}></Col>
                <Col sm={8}>
                  <Card fluid>
                    <Card.Content>
                      <Card.Header>#{this.props.argument.num}</Card.Header>
                      <Card.Description>{this.props.argument.content}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Icon name='star' /><Icon name='star' /><Icon name='star' /><Icon name='star' /><Icon name='star' />
                      <a>
                        <Icon name='comment' floated='right'/>
                        Comentarios
                      </a>
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
