import React, { Component } from 'react';

//Components
import ForkButton from '../../components/ForkButton';

// React Context API
import AuthContext from "../../AuthContext";

//Routing
import { Link } from 'react-router-dom';

//Utils
import TextTruncate from 'react-text-truncate';

//UI framework
//import { Container, Row, Col } from 'react-grid-system';
import { Button, Icon, Item, Modal, Header } from 'semantic-ui-react';

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

    let deleteButton;
    if (this.context.loggedIn && this.context.authUser.id === this.props.discussion.owner.id)
      deleteButton =
      <Modal closeIcon trigger={<Button as='button' floated='right' icon><Icon name='remove'/> Borrar </Button>} basic size='small'>
        <Header icon='trash' content='Borrar discussion' />
        <Modal.Content>
          <p>
            Estas seguro de querer borrar esta discussion?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' inverted onClick={() => this.handleOnClickDelete(this.props.discussion.id)}>
            <Icon name='trash' /> Eliminar
          </Button>
        </Modal.Actions>
      </Modal>

    return (
      <Item>
        <Item.Image size='tiny' rounded src={this.props.discussion.owner.imageUrl} />

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
            {deleteButton}
            {this.context.loggedIn &&
              <ForkButton discussionId={this.props.discussion.id}/>}
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

DiscussionItem.contextType = AuthContext

export default DiscussionItem;
