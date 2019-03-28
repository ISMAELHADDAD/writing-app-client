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

//UI framework
import { Item, Button, Icon } from 'semantic-ui-react';

class DiscussionItem extends Component {

  handleOnClickDelete = (id) => this.props.passClickDelete(id)

  render() {
    return (
      <Item>
        {window.innerWidth > 770 &&
        <Item.Image size='tiny' rounded src={this.props.discussion.owner.imageUrl} />}

        <Item.Content>
          <Item.Header as={Link} to={'/discussion/'+this.props.discussion.id}>{this.props.discussion.topicTitle}</Item.Header>
          <Item.Description as={Link} to={'/discussion/'+this.props.discussion.id}>
            <TextTruncate
                line={2}
                truncateText="…"
                text={this.props.discussion.topicDescription}
            />
          </Item.Description>
          <Item.Extra>
            @{this.props.discussion.owner.name}
            {this.context.loggedIn && this.context.authUser.id === this.props.discussion.owner.id &&
              <DeleteDiscussionButton discussionId={this.props.discussion.id} passClickDelete={this.handleOnClickDelete}/>}
            {this.context.loggedIn &&
              <ForkDiscussionButton discussionId={this.props.discussion.id}/>}
            {this.context.loggedIn && this.context.authUser.id === this.props.discussion.owner.id && this.props.discussion.private &&
            <Button basic icon floated='right'>
                <Icon name='lock'/>
            </Button>}
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

DiscussionItem.contextType = AuthContext

export default DiscussionItem;
