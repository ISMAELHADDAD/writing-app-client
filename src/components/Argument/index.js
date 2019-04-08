import React, { Component } from 'react';

//Utils
import moment from 'moment';
import 'moment/locale/es';

//UI framework
import { Row, Col } from 'react-grid-system';
import { Card, Icon, Button, Rating, Popup } from 'semantic-ui-react';

class Argument extends Component {

  constructor(props) {
    super(props);
    moment.locale('es');
  }

  render() {

    let publishTime = new Date(this.props.argument.publishTime)

    // Argument block
    let blockSpeech =
      <Card fluid style={this.props.argument.highlight? {border: '4px solid yellow'}:null }>
        <Card.Content>
          <Card.Header>#{this.props.argument.num}</Card.Header>
          <Card.Meta>
            <Popup
              trigger={<p>{moment(publishTime).fromNow()} por {this.props.argument.fromAvatarName}</p>}
              content={moment(publishTime).format('LLLL')}
              inverted
            />
          </Card.Meta>
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

    let side
    // Populate argument on the left side
    if (this.props.argument.fromAvatarId === this.props.avatarOneId) {
      side = <Row>
                <Col sm={8}>
                  {blockSpeech}
                </Col>
                <Col sm={4}></Col>
              </Row>
    }
    // Or populate argument on the right side
    else {
      side = <Row>
                <Col sm={4}></Col>
                <Col sm={8}>
                  {blockSpeech}
                </Col>
              </Row>
    }

    return (
      <div>
        {side}
        <br />
      </div>
    );
  }
}

export default Argument;
