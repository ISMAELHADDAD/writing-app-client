import React, { Component } from 'react';

//API
//import API from '../../services/api/app';

// React Context API
import AuthContext from "../../AuthContext";

//Routing
import { Link } from 'react-router-dom';

//Utils
import TextTruncate from 'react-text-truncate';

//UI framework
//import { Container, Row, Col } from 'react-grid-system';
import { Button, Icon, Item } from 'semantic-ui-react';

class DiscussionItem extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleOnClickDelete = (id) => this.props.passClickDelete(id)

  componentDidMount() {

  }

  render() {
    return (
      <Item as={Link} to={'/discussion/'+this.props.discussion.id}>
        <Item.Image size='tiny' rounded src={this.props.discussion.owner.imageUrl} />

        <Item.Content>
          <Item.Header>{this.props.discussion.topicTitle}</Item.Header>
          <Item.Description>
            <TextTruncate
                line={2}
                truncateText="…"
                text={this.props.discussion.topicDescription}
            />
          </Item.Description>
          <Item.Extra>
            @{this.props.discussion.owner.name}
            {this.context.loggedIn && this.context.authUser.id === this.props.discussion.owner.id &&
            <Button floated='right' icon onClick={() => this.handleOnClickDelete(this.props.discussion.id)}> <Icon name='remove'/> Borrar </Button>}
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

DiscussionItem.contextType = AuthContext

export default DiscussionItem;
