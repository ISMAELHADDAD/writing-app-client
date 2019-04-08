import React, { Component } from 'react';

//Components
import ForkDiscussionButton from '../../components/ForkDiscussionButton';
import DeleteDiscussionButton from '../../components/DeleteDiscussionButton';

// React Context API
import AuthContext from "../../AuthContext";

//Routing
import { Link } from 'react-router-dom';

//Utils
import TextTruncate from 'react-text-truncate';
import moment from 'moment';
import 'moment/locale/es';

//UI framework
import { Row, Col, Visible, Hidden } from 'react-grid-system';
import { Item, Button, Icon, Image, Popup } from 'semantic-ui-react';

class DiscussionItem extends Component {

  constructor(props) {
    super(props);
    moment.locale('es');
  }

  handleOnClickDelete = (id) => this.props.passClickDelete(id)

  render() {

    let publishTime = new Date(this.props.discussion.publishTime)

    let controlButtons;
    if (this.context.loggedIn)
      controlButtons =
        <div>
          {/* Delete Button */}
          {this.context.authUser.id === this.props.discussion.owner.id &&
            <DeleteDiscussionButton discussionId={this.props.discussion.id} passClickDelete={this.handleOnClickDelete}/>}
          {/* Fork Button */}
          <ForkDiscussionButton discussionId={this.props.discussion.id}/>
          {/* Private icon */}
          {this.context.authUser.id === this.props.discussion.owner.id && this.props.discussion.private &&
          <Button basic icon floated='right'>
              <Icon name='lock'/>
          </Button>}
        </div>

    return (
      <Item>

        <Item.Content>
          <Item.Header as={Link} to={'/discussion/'+this.props.discussion.id}>{this.props.discussion.topicTitle}</Item.Header>
          <Item.Description as={Link} to={'/discussion/'+this.props.discussion.id}>
            <Row>
              <Col md={this.context.loggedIn? 6:12} lg={this.context.loggedIn? 9:12}>
                <TextTruncate
                    line={2}
                    truncateText="…"
                    text={this.props.discussion.topicDescription}
                />
              </Col>
              <Hidden xs sm>
                <Col md={6} lg={3}>
                  {controlButtons}
                </Col>
              </Hidden>
            </Row>
          </Item.Description>
          <Item.Extra>
            <Image floated='left' size='mini' src={this.props.discussion.owner.imageUrl} />
            @{this.props.discussion.owner.name}
            <Popup
              trigger={<p>Publicado {moment(publishTime).fromNow()}</p>}
              content={moment(publishTime).format('LLLL')}
              inverted
            />
          </Item.Extra>
          <Visible xs sm>
            <Item.Extra>
              {controlButtons}
            </Item.Extra>
          </Visible>
        </Item.Content>
      </Item>
    );
  }
}

DiscussionItem.contextType = AuthContext

export default DiscussionItem;
