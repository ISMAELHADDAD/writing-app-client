import React, { Component } from 'react';

//Components
import DiscussionItem from '../../components/DiscussionItem';

//API
import API from '../../services/api/app';

// React Context API
import AuthContext from "../../AuthContext";

//UI framework
import { Container, Row, Col } from 'react-grid-system';
import { Segment, Button, Icon, Modal, Form, Image, Header, Item } from 'semantic-ui-react';

class MyDiscussionsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      discussions: [],
      titleText: '',
      descriptionText: '',
      nameOneText: '',
      opinionOneText: '',
      nameTwoText: '',
      opinionTwoText: ''
    };
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleOnClickCreate = () => {
    API.createNewDiscussion(this.context.authUser.token,
      {
        topic_title: this.state.titleText,
        topic_description: this.state.descriptionText,
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

  handleOnClickDelete = (id) => {
    if (this.context.loggedIn)
      API.deleteDiscussion(this.context.authUser.token, id)
      .then(result => {
        this.setState({
          discussions: this.state.discussions
            .filter(i => i.id !== id)
        })
      })
  }

  componentDidMount() {
    if (this.context.loggedIn)
      API.getMyDiscussions(this.context.authUser.token)
      .then(result => {
        this.setState({discussions: result.discussions})
      })
  }

  render() {

    let topicList
    if (this.state.discussions.length < 1) {
      topicList =
        <Container style={{textAlign: 'center'}}>
          <br/>
          <Header as='h2' disabled>
            No hay discusiones
          </Header>
        </Container>
    } else {
      topicList =
        <Item.Group link divided>
          {this.state.discussions && this.state.discussions.map((discussion) => (
            <DiscussionItem key={discussion.id} discussion={discussion} passClickDelete={this.handleOnClickDelete}/>
          ))}
        </Item.Group>
    }

    return (
      <div style={{backgroundColor: '#eee', minHeight: '90.5vh'}}>
        <Container>
          <br/>
          <Segment>
            {this.context.loggedIn &&
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
            </Modal>}

            {topicList}
          </Segment>
        </Container>
      </div>
    );
  }
}

MyDiscussionsPage.contextType = AuthContext

export default MyDiscussionsPage;
