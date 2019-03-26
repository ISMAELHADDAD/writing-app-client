import React, { Component } from 'react';

//API
import API from '../../services/api/app';

// React Context API
import AuthContext from "../../AuthContext";

//Routing
import { withRouter } from 'react-router-dom';

//UI framework
import { Button, Icon, Modal, Header } from 'semantic-ui-react';

class ForkDiscussionButton extends Component {

  handleOnClickFork = () => {
    API.forkDiscussion(this.context.authUser.token, this.props.discussionId)
    .then(result => this.props.history.push(`discussion/${result.id}`))
  }

  render() {
    return (
      <Modal closeIcon trigger={<Button as='button' floated='right' color='blue' icon><Icon name='fork'/> Fork </Button>} basic size='small'>
        <Header icon='fork' content='Fork' />
        <Modal.Content>
          <p>
            Estas seguro de querer hacer fork a esta discussion?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' inverted onClick={this.handleOnClickFork}>
            <Icon name='check' /> Confirmar
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

ForkDiscussionButton.contextType = AuthContext

export default withRouter(ForkDiscussionButton);
