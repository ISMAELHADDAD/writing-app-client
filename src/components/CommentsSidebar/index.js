import React, { Component } from 'react';

//API
import API from '../../services/api/app';

// React Context API
import AuthContext from "../../AuthContext";

//Utils
import moment from 'moment';
import 'moment/locale/es';

//UI framework
import { Container } from 'react-grid-system';
import { Sidebar, Segment, Form, Button, Icon, Divider, Header, Comment } from 'semantic-ui-react'

class CommentsSidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      textToSubmit: ''
    };
    moment.locale('es');
  }

  handleClickClose = () => {
    this.props.passClickClose()
  }

  handleChangeTextComment = (e, { value }) => this.setState({ textToSubmit: value })

  handleClickSendComment = () => {
    if (this.state.textToSubmit !== '')
      API.sendComment(this.context.authUser.token,this.props.discussionId,this.props.argumentId, {text: this.state.textToSubmit})
      .then(comment => {this.setState({comments: [...this.state.comments, comment] });})
  }

  componentDidUpdate(prevProps) {
    if (this.props.visible && prevProps.visible !== this.props.visible)
      API.getComments(this.props.discussionId,this.props.argumentId)
      .then(comments => {this.setState({comments: comments });})
  }

  render() {
    return (
      <Sidebar as={Segment}
        animation={'overlay'}
        direction={'right'}
        visible={this.props.visible}
        width="very wide"
        style={{width: window.innerWidth > 770? null:'100%'}}
        >
        <Container>

          <Button basic icon='angle right' floated='right' onClick={this.handleClickClose}/>

          <Comment.Group>
            
            <Header as='h3'>
              <Icon name='comment' />
              <Header.Content>Panel de comentarios</Header.Content>
            </Header>
            <Divider/>

            {this.state.comments && this.state.comments.map((item) => (
              <Comment key={item.id}>
                <Comment.Avatar src={item.user.imageUrl} />
                <Comment.Content>
                  <Comment.Author as='a'>{item.user.name}</Comment.Author>
                  <Comment.Metadata>
                    <div>{moment(item.date).fromNow()}</div>
                  </Comment.Metadata>
                  <Comment.Text>{item.text}</Comment.Text>
                </Comment.Content>
              </Comment>
            ))}

            {this.context.loggedIn &&
            <Form reply onSubmit={this.handleClickSendComment}>
              <Form.TextArea onChange={this.handleChangeTextComment}/>
              <Button content='Comentar' labelPosition='left' icon='send' primary />
            </Form>
            }

          </Comment.Group>

        </Container>
      </Sidebar>
    );
  }
}

CommentsSidebar.contextType = AuthContext

export default CommentsSidebar;
