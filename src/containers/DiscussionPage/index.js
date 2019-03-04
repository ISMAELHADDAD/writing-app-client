import React, { Component } from 'react';
import './styles.css'

//Components
import Argument from '../../components/Argument';
import Agreement from '../../components/Agreement';
import Avatar from '../../components/Avatar';
import TextEditorSidebar from '../../components/TextEditorSidebar';
import Login from '../../components/Login';

//API
import API from '../../services/api/app';

//UI framework
import Headroom from 'react-headroom';
import { Link, Element} from 'react-scroll';

import { Container, Row, Col } from 'react-grid-system';
import { Table, Card, Button, Icon, Header, Segment, Menu, Input, TextArea, Form, Dropdown } from 'semantic-ui-react';

class DiscussionPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user_id_LoggedIn: 1,
      discussion: {},
      textEditorSidebarVisibility: false,
      agreePointVisibility: false,
      agreeSelect: [
        {
          text: 'Acuerdo',
          value: true
        },
        {
          text: 'Desacuerdo',
          value: false
        }
      ],
      avatarSelect: [],
      whoProposed: null,
      proposedText: '',
      isAgree: null,
      validAgree: false,
      validAvatar: false,
      user_avatars: []
    };

  }

  handleTextEditorSidebarVisibility = () => {
    this.setState({ textEditorSidebarVisibility: !this.state.textEditorSidebarVisibility })
  }

  handleAgreePointVisibility = () => {
    this.setState({ agreePointVisibility: !this.state.agreePointVisibility })
  }

  handleAgreePointChangeSelect = (event, data) => {
    this.setState({ isAgree: data.value, validAgree: true });
  };

  handleAgreePointAvatarChangeSelect = (event, data) => {
    this.setState({ whoProposed: data.value, validAvatar: true });
  };

  handleAgreePointChangeText = (event, data) => {
    this.setState({ proposedText: data.value });
  };

  handleSendArgument = (who, textContent) => {
    API.sendArgument(this.state.discussion.id, {
      'user_id': this.state.user_id_LoggedIn,
      'avatar_id': who,
      'content': textContent
    })
    .then(argument => {
      this.setState(prevState => ({
        ...this.state,
        discussion: {
          ...this.state.discussion,
          arguments: [...prevState.discussion.arguments, argument]
        }
      }));
    });
  }

  handleSendAgreement = () => {
    API.sendAgreement(this.state.discussion.id, {
      'user_id': this.state.user_id_LoggedIn,
      'avatar_id': this.state.whoProposed,
      'content': this.state.proposedText,
      'isAgree': this.state.isAgree
    })
    .then(agreement => {
      this.setState(prevState => ({
        ...this.state,
        discussion: {
          ...this.state.discussion,
          agreements: [...prevState.discussion.agreements, agreement]
        }
      }));
    });
  }

  handleRejectedAgreement = (agreementId, avatarId) => {
    API.rejectAgreement(this.state.discussion.id, agreementId, {
      'user_id': this.state.user_id_LoggedIn,
      'avatar_id': avatarId,
      'isAccepted': false
    })
    .then(message => {
      this.setState({
        discussion: {
          ...this.state.discussion,
          agreements: this.state.discussion.agreements.slice()
            .filter(i => i.id !== agreementId)
        }
      });
    });
  }

  handleAcceptedAgreement = (agreementId, avatarId) => {
    API.rejectAgreement(this.state.discussion.id, agreementId, {
      'user_id': this.state.user_id_LoggedIn,
      'avatar_id': avatarId,
      'isAccepted': false
    })
    .then(message => {
      let newAgreement = this.state.discussion.agreements.slice().find(i => i.id === agreementId)
      newAgreement.isAccepted = true

      this.setState({
        discussion: {
          ...this.state.discussion,
          agreements: this.state.discussion.agreements.slice().map(agreement => {
            if (agreement.id === agreementId)
              return newAgreement;
            return agreement;
          })
        }
      });
    });
  }

  componentDidMount() {
    //API calls here
    API.getDiscussion(this.props.id)
      .then(discussion => {
        this.setState({...this.state,
          discussion: discussion,
          avatarSelect: [
            {
              text: discussion.avatarOne.name,
              value: discussion.avatarOne.id,
              image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/large/matthew.png' },
            },
            {
              text: discussion.avatarTwo.name,
              value: discussion.avatarTwo.id,
              image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/large/matthew.png' },
            }
          ]
        });
        if (this.state.user_id_LoggedIn === discussion.avatarOne.assigned_to_UserID)
          this.setState({...this.state,
            user_avatars: [...this.state.user_avatars, discussion.avatarOne.id]});
        if (this.state.user_id_LoggedIn === discussion.avatarTwo.assigned_to_UserID)
          this.setState({...this.state,
            user_avatars: [...this.state.user_avatars, discussion.avatarTwo.id]});
      });
  }

  render() {
    return (
      <div style={{backgroundColor: '#eee'}}>
        <Segment style={{marginBottom: '0px'}} inverted color='grey'>
        <Headroom>
          <Container>
            <Menu stackable>
              <Menu.Item>
                <img src='https://react.semantic-ui.com/logo.png' alt=''/>
              </Menu.Item>
              <Menu.Item className='botonMenu' name='titulo' active={false} onClick={this.handleItemClick} >
                <Link activeClass="active" className="test1" to="test1" spy={true} smooth={true} duration={500} style={{color:'black'}}>Titulo</Link>
              </Menu.Item>
              <Menu.Item className='botonMenu'
                name='argumentos'
                active={false}
                onClick={this.handleItemClick}
              >
                <Link activeClass="active" className="test2" to="test2" spy={true} smooth={true} duration={500} style={{color:'black'}}>Argumentos</Link>
              </Menu.Item>
              <Menu.Item className='botonMenu'
                name='puntos de concordancia'
                active={false}
                onClick={this.handleItemClick}
              >
                <Link activeClass="active" className="test3" to="test3" spy={true} smooth={true} duration={500} style={{color:'black'}}>Puntos de concordancia</Link>
              </Menu.Item>
              <Menu.Item>
                <Button icon labelPosition='left' primary size='small' onClick={this.handleTextEditorSidebarVisibility}>
                  <Icon name='add' /> Añadir argumento
                </Button>
              </Menu.Item>
              <Menu.Item>
                <Login/>
              </Menu.Item>
              <Menu.Menu position='right'>
                <Menu.Item>
                  <Input icon='search' placeholder='Search argument...' />
                </Menu.Item>
              </Menu.Menu>
            </Menu>
          </Container>
        </Headroom>
      </Segment>

        <Element name="test1" className="element" >
          <Card fluid>
            <Container>

                <br/>
                <h1>{this.state.discussion.topicTitle}</h1>
                <p>
                  {this.state.discussion.topicDescription}
                </p>
                <br/>

            </Container>
          </Card>
          <br/>
        </Element>

        <Container>
          <Card fluid>
            <br/>
            <Element name="test2" className="element" >
              <Container>
                <Row>
                  <Col sm={1}/>
                  <Col sm={4}>
                    {this.state.discussion.avatarOne &&
                    <Avatar avatar={this.state.discussion.avatarOne}/>}
                  </Col>
                  <Col sm={2}/>
                  <Col sm={4}>
                    {this.state.discussion.avatarTwo &&
                    <Avatar avatar={this.state.discussion.avatarTwo}/>}
                  </Col>
                  <Col sm={1}/>
                </Row>
              </Container>
              <br/>
              <Container>
                {this.state.discussion.arguments && this.state.discussion.arguments.map((item) => (
                   <Argument key={item.num} argument={item} avatarOneID={this.state.discussion.avatarOne.id}/>
                ))}
                <br/>
              </Container>
            </Element>

            <Element name="test3" className="element" >
              <Container>
                <br/>
                <br/>
                <Header as='h2' attached='top' style={{textAlign: 'center'}}>
                  Tabla de puntos en acuerdo y en desacuerdo
                </Header>
                <Table>
                  <Table.Body>
                    {this.state.discussion.agreements && this.state.discussion.agreements.map((item) => (
                      <Agreement
                        key={item.id}
                        point={item}
                        isAgree={item.isAgree}
                        user_avatars={this.state.user_avatars}
                        passAcceptClick={this.handleAcceptedAgreement}
                        passRejectClick={this.handleRejectedAgreement}
                      />
                    ))}
                    <Table.Row style={{display: this.state.agreePointVisibility? null:'none'}}>
                      <Table.Cell colSpan='3'>
                        <Row>
                          <Col sm={2}>
                            <Dropdown compact placeholder='Tipo' selection options={this.state.agreeSelect} onChange={this.handleAgreePointChangeSelect}/>
                          </Col>
                          <Col sm={3}>
                            <Dropdown placeholder='Selecciona el avatar' selection options={this.state.avatarSelect} onChange={this.handleAgreePointAvatarChangeSelect}/>
                          </Col>
                          <Col sm={7}>
                            <Form>
                              <TextArea placeholder='Propone un punto en acuerdo o en desacuerdo...' style={{ minHeight: 50, maxHeight: 50 }} onChange={this.handleAgreePointChangeText}/>
                            </Form>
                          </Col>
                        </Row>
                        <br/>
                        <Row>
                          <Col>
                            <Button disabled={!(this.state.validAgree && this.state.validAvatar)} floated='right' icon labelPosition='left' primary size='small' onClick={this.handleSendAgreement}>
                              <Icon name='send' /> Enviar
                            </Button>
                          </Col>
                        </Row>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                  <Table.Footer fullWidth>
                    <Table.Row>
                      <Table.HeaderCell />
                      <Table.HeaderCell colSpan='4'>
                        <Button floated='right' icon labelPosition='left' primary size='small' onClick={this.handleAgreePointVisibility}>
                          <Icon name='add' /> Añadir punto
                        </Button>
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>
              </Container>
            </Element>
          </Card>
        </Container>

        <Container>
          <TextEditorSidebar
            visible={this.state.textEditorSidebarVisibility}
            avatarOne={this.state.discussion.avatarOne}
            avatarTwo={this.state.discussion.avatarTwo}
            passClick={this.handleSendArgument}
          />
        </Container>

        <Header as='h4' block>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
        </Header>

      </div>
    );
  }
}

export default DiscussionPage;
