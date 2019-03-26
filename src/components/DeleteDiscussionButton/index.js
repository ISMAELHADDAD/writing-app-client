import React, { Component } from 'react';

//UI framework
import { Button, Icon, Modal, Header } from 'semantic-ui-react';

class DeleteDiscussionButton extends Component {

  handleOnClickDelete = (id) => this.props.passClickDelete(id)

  render() {
    return (
      <Modal closeIcon trigger={<Button as='button' floated='right' icon><Icon name='remove'/> Borrar </Button>} basic size='small'>
        <Header icon='trash' content='Borrar discussion' />
        <Modal.Content>
          <p>
            Estas seguro de querer borrar esta discussion?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' inverted onClick={() => this.handleOnClickDelete(this.props.discussionId)}>
            <Icon name='trash' /> Eliminar
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default DeleteDiscussionButton;
