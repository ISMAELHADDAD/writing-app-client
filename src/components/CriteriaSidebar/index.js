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
import { Sidebar, Segment, Form, Button, Icon, Divider, Header, Comment, List } from 'semantic-ui-react'

class CriteriaSidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      criteria: [],
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
      API.addCriteria(this.context.authUser.token,this.props.discussionId, {text: this.state.textToSubmit})
      .then(criterion => {this.setState({criteria: [...this.state.criteria, criterion] });})
  }

  componentDidUpdate(prevProps) {
    // if (this.props.visible && prevProps.visible !== this.props.visible)
    //   API.getCriteria(this.props.discussionId)
    //   .then(criteria => {this.setState({criteria: criteria });})
  }

  render() {
    return (
      <Sidebar as={Segment}
        animation={'overlay'}
        direction={'left'}
        visible={this.props.visible}
        width="very wide"
        style={{width: window.innerWidth > 770? null:'100%'}}
        >
        <Container>

          <Button basic icon='angle left' floated='right' onClick={this.handleClickClose}/>

          <Comment.Group>

            <Header as='h3'>
              <Icon name='write' />
              <Header.Content>Criterios para la valoración</Header.Content>
            </Header>
            <Divider/>
            <p style={{color: 'grey', marginBottom: '25px', textAlign: 'justified'}}>
              Aquí se listan todos los criterios, los cuales se usarán para valorar la discusión.
              {this.context.loggedIn && this.context.authUser.id === this.props.ownerId? ' Utiliza el formulario de abajo para añadir mas criterios.':null}
            </p>

            <List bulleted size='medium' relaxed='very'>
              {this.state.criteria > 0 ?
                this.state.criteria.map((item) => (
                  <List.Item key={item.id}>{item.text}</List.Item>
                ))
                :
                <Header disabled textAlign='center'>
                   La lista esta vacia
                   {this.context.loggedIn && this.context.authUser.id === this.props.ownerId? <Header.Subheader>Añade un nuevo criterio</Header.Subheader>:null}
                </Header>
              }
            </List>

            {this.context.loggedIn &&
            <Form reply onSubmit={this.handleClickSendComment}>
              <Form.TextArea onChange={this.handleChangeTextComment} style={{ minHeight: 50, maxHeight: 100 }}/>
              <Button content='Añadir criterio' labelPosition='left' icon='add' primary />
            </Form>
            }

          </Comment.Group>

        </Container>
      </Sidebar>
    );
  }
}

CriteriaSidebar.contextType = AuthContext

export default CriteriaSidebar;
