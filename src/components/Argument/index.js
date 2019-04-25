import React, { Component } from 'react';

//Components
import CommentsSidebar from '../../components/CommentsSidebar';

//Utils
import moment from 'moment';
import 'moment/locale/es';

//UI framework
import { Row, Col } from 'react-grid-system';
import { Card, Icon, Button, Rating, Popup } from 'semantic-ui-react';

class Argument extends Component {

  constructor(props) {
    super(props);
    this.state = {
      commentsSidebarVisibility: false
    };
    moment.locale('es');
  }

  handleShowCommentsSidebar = () => this.setState({ commentsSidebarVisibility: true })

  handleHideCommentsSidebar = () => this.setState({ commentsSidebarVisibility: false })

  render() {

    let publishTime = new Date(this.props.argument.publishTime)

    // Argument block
    let blockSpeech =
      <Card fluid style={this.props.argument.highlight? {border: '4px solid yellow'}:null }>
        <Card.Content>
          <Card.Header>#{this.props.argument.num}</Card.Header>
          <Card.Meta>
            <Popup
              trigger={<p>{moment(publishTime).fromNow()} por {this.props.argument.fromAvatar.name}</p>}
              content={moment(publishTime).format('LLLL')}
              inverted
            />
          </Card.Meta>
          <Card.Description>{this.props.argument.content}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Rating icon='star' defaultRating={0} maxRating={5} />
          <Button basic floated='right' onClick={this.handleShowCommentsSidebar}>
            <Icon name='comment'/>
            Comentarios
          </Button>
        </Card.Content>
      </Card>

    let side
    // Populate argument on the left side
    if (this.props.argument.fromAvatar.id === this.props.avatarOneId) {
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
        <CommentsSidebar
          visible={this.state.commentsSidebarVisibility}
          passClickClose={this.handleHideCommentsSidebar}
          discussionId={this.props.discussionId}
          argumentId={this.props.argument.id}
        />
      </div>
    );
  }
}

export default Argument;
