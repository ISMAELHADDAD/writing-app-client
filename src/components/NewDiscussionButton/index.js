import React, { Component } from 'react';

//API
import API from '../../services/api/app';

// React Context API
import AuthContext from "../../AuthContext";

//UI framework
import { Row, Col } from 'react-grid-system';
import { Button, Icon, Modal, Form, Image } from 'semantic-ui-react';

class NewDiscussionButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      titleText: '',
      descriptionText: '',
      private: false,
      nameOneText: '',
      opinionOneText: '',
      nameTwoText: '',
      opinionTwoText: ''
    };
  }

  handleChange = (e, { name, value }) => {this.setState({ [name]: value })}

  handleChangeOnCheckBox = (e,d) => this.setState({ private: d.checked })

  handleOnClickCreate = () => {
    API.createNewDiscussion(this.context.authUser.token,
      {
        topic_title: this.state.titleText,
        topic_description: this.state.descriptionText,
        private: this.state.private,
        name_avatar_one: this.state.nameOneText,
        opinion_avatar_one: this.state.opinionOneText,
        name_avatar_two: this.state.nameTwoText,
        opinion_avatar_two: this.state.opinionTwoText
      }
    )
    .then(discussion => {
      this.props.history.push(`/discussion/${discussion.id}`)
    })
  }

  render() {
    return (
      <Modal
        trigger={
          <Button primary animated floated='right'>
            <Button.Content visible>Nueva discusión</Button.Content>
            <Button.Content hidden>
              <Icon name='add' />
            </Button.Content>
          </Button>}
        closeIcon
        >
        <Modal.Header>Nueva discusión</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input label='Título' placeholder='Título' name='titleText' value={this.state.titleText} onChange={this.handleChange}/>
            <Form.TextArea label='Descripción' placeholder='Descripción' name='descriptionText' value={this.state.descriptionText} onChange={this.handleChange} style={{ minHeight: 100, maxHeight: 100 }}/>
            <Row style={{padding: '20px'}}><Icon name='lock'/> <Form.Checkbox toggle name='private' onChange={this.handleChangeOnCheckBox}/></Row>
          </Form>
        </Modal.Content>
        <Row style={{padding: '20px'}}>
          <Col>
            <Modal.Content style={{textAlign: 'center'}}>
              <Image circular wrapped size='small' src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
              <Modal.Description style={{textAlign: 'left'}}>
                <Form>
                  <Form.Input label='Nombre primer avatar' placeholder='Nombre' name='nameOneText' value={this.state.nameOneText} onChange={this.handleChange}/>
                  <Form.TextArea label='Opinión primer avatar' placeholder='Opinión' name='opinionOneText' value={this.state.opinionOneText} onChange={this.handleChange} style={{ minHeight: 100, maxHeight: 100 }}/>
                </Form>
              </Modal.Description>
            </Modal.Content>
          </Col>
          <Col>
            <Modal.Content style={{textAlign: 'center'}}>
              <Image circular wrapped size='small' src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
              <Modal.Description style={{textAlign: 'left'}}>
                <Form>
                  <Form.Input label='Nombre segundo avatar' placeholder='Nombre' name='nameTwoText' value={this.state.nameTwoText} onChange={this.handleChange}/>
                  <Form.TextArea label='Opinión segundo avatar' placeholder='Opinión' name='opinionTwoText' value={this.state.opinionTwoText} onChange={this.handleChange} style={{ minHeight: 100, maxHeight: 100 }}/>
                </Form>
              </Modal.Description>
            </Modal.Content>
          </Col>
        </Row>
        <Modal.Actions>
          <Button positive onClick={this.handleOnClickCreate}>
            <Icon name='checkmark'/> Crear
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

NewDiscussionButton.contextType = AuthContext

export default NewDiscussionButton;
