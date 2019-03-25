import React, { Component } from 'react';
import './styles.css'

//Components
import Argument from '../../components/Argument';
import Agreement from '../../components/Agreement';
import Avatar from '../../components/Avatar';
import TextEditorSidebar from '../../components/TextEditorSidebar';
import InviteButton from '../../components/InviteButton';

//API
import API from '../../services/api/app';

// React Context API
import AuthContext from "../../AuthContext";

//Sockets
import Cable from 'actioncable';

//UI framework
import Headroom from 'react-headroom';
import { Link, Element, scroller} from 'react-scroll';

import { Container, Row, Col } from 'react-grid-system';
import { Table, Card, Button, Icon, Header, Menu, TextArea, Form, Dropdown,
  Rail, Sticky, Responsive, Segment, Dimmer, Loader} from 'semantic-ui-react';

class DiscussionPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDiscussionLoaded: false,
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
      validAvatar: false
    };
    this.argumentsRef = React.createRef();

    //1. Create a connection to this discussion room
    if (this.props.match.params.id > 0)
      this.createSocket()
  }

  createSocket() {
    let cable = Cable.createConsumer(process.env.REACT_APP_CABLE_URL)

    //Subscribe to discussion channel
    this.discussion = cable.subscriptions.create({
      channel: 'DiscussionChannel', room: `${this.props.match.params.id}`
    }, {
      connected: () => {console.log('connected to socket')},
      received: (data) => {
        console.log('data received from socket:')
        console.log(data)
        this.processDataReceivedFromSocket(data)
      }
    });
  }

  processDataReceivedFromSocket = (data) => {
    if (data.type === 'argument') {
      let argument = JSON.parse(data.content)
      argument.highlight = true
      this.setState(prevState => ({
        discussion: {
          ...this.state.discussion,
          arguments: [...prevState.discussion.arguments, argument]
        }
      }))

      //Scroll and highlight the new argument
      this.scrollToNewArgument()
      setTimeout(() => {
        const updatedArguments = this.state.discussion.arguments.slice()
        updatedArguments[updatedArguments.length-1].highlight = false
        this.setState({
          discussion: {
            ...this.state.discussion,
            arguments: updatedArguments
          }
        })
      }, 3000)
    }
    else if (data.type === 'agreement-propose') {
      let agreement = JSON.parse(data.content)
      this.setState(prevState => ({
        agreePointVisibility: false,
        discussion: {
          ...this.state.discussion,
          agreements: [...prevState.discussion.agreements, agreement]
        }
      }))
    }
    else if (data.type === 'agreement-accept') {
      let agreementId = parseInt(data.content)
      let newAgreement = this.state.discussion.agreements.find(i => i.id === agreementId)
      newAgreement.isAccepted = true
      console.log(newAgreement);
      this.setState({
        discussion: {
          ...this.state.discussion,
          agreements: this.state.discussion.agreements.map(agreement =>
            (agreement.id === agreementId)? newAgreement : agreement
          )
        }
      })
    }
    else if (data.type === 'agreement-reject') {
      let agreementId = parseInt(data.content)
      this.setState({
        discussion: {
          ...this.state.discussion,
          agreements: this.state.discussion.agreements
            .filter(i => i.id !== agreementId)
        }
      })
    }
    else if (data.type === 'participant-verified') {
      this.setState(prevState => ({
        discussion: {
          ...this.state.discussion,
          participants: [...prevState.discussion.participants, data.content]
        }
      }))
    }
    else if (data.type === 'avatar-assign') {
      let content = JSON.parse(data.content);
      this.setState({ avatarSelect: [] })
      if (this.state.discussion.avatarOne.id === content.avatarId)
        this.setState(prevState => ({
          discussion: {
            ...this.state.discussion,
            avatarOne: {
              ...this.state.discussion.avatarOne,
              assignedToUserId: content.userId
            }
          }
        }))
      else if (this.state.discussion.avatarTwo.id === content.avatarId)
        this.setState(prevState => ({
          discussion: {
            ...this.state.discussion,
            avatarTwo: {
              ...this.state.discussion.avatarTwo,
              assignedToUserId: content.userId
            }
          }
        }))

      //Update avatarSelect
      if (this.state.discussion.avatarOne.assignedToUserId === this.context.authUser.id)
        this.setState({ avatarSelect: [...this.state.avatarSelect, {
          text: this.state.discussion.avatarOne.name,
          value: this.state.discussion.avatarOne.id,
          image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/large/matthew.png' },
        }]})
      if (this.state.discussion.avatarTwo.assignedToUserId === this.context.authUser.id)
        this.setState({ avatarSelect: [...this.state.avatarSelect, {
          text: this.state.discussion.avatarTwo.name,
          value: this.state.discussion.avatarTwo.id,
          image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/large/matthew.png' },
        }]})
    }
  }

  userIsParticipating = () => {
    return (
      this.context.authUser.id === this.state.discussion.avatarOne.assignedToUserId
      ||
      this.context.authUser.id === this.state.discussion.avatarTwo.assignedToUserId
    )
  }

  handleTextEditorSidebarVisibility = () => {
    this.setState({ textEditorSidebarVisibility: true })
  }

  handleHideTextEditorSidebar = () => {
    this.setState({ textEditorSidebarVisibility: false })
  }

  scrollToNewArgument() {
    scroller.scrollTo('scroll-to-new-argument', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -300
    })
  }

  handleAgreePointVisibility = () => {
    this.setState({ agreePointVisibility: true })
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
    API.sendArgument(this.context.authUser.token,this.state.discussion.id, {
      'user_id': this.context.authUser.id,
      'avatar_id': who,
      'content': textContent
    })
    .then(argument => {
      //Error control???
    });
  }

  handleSendAgreement = () => {
    API.sendAgreement(this.context.authUser.token, this.state.discussion.id, {
      'user_id': this.context.authUser.id,
      'avatar_id': this.state.whoProposed,
      'content': this.state.proposedText,
      'is_agree': this.state.isAgree
    })
    .then(agreement => {
      //Error control???
    });
  }

  handleRejectedAgreement = (agreementId, avatarId) => {
    API.rejectAgreement(this.context.authUser.token, this.state.discussion.id, agreementId, {
      'user_id': this.context.authUser.id,
      'avatar_id': avatarId,
      'is_accepted': "false"
    })
    .then(message => {
      //Error control???
    });
  }

  handleAcceptedAgreement = (agreementId, avatarId) => {
    API.acceptAgreement(this.context.authUser.token, this.state.discussion.id, agreementId, {
      'user_id': this.context.authUser.id,
      'avatar_id': avatarId,
      'is_accepted': "true"
    })
    .then(message => {
      //Error control???
    });
  }

  componentDidMount() {
    if (this.props.match.params.id > 0)
      // Pass discussion Id to CurrentSessionContext
      this.props.getDiscussionId(this.props.match.params.id)

    //API calls here
    API.getDiscussion(this.props.match.params.id)
      .then(discussion => {
        this.setState({
          isDiscussionLoaded: true,
          discussion: discussion
        })

        if (this.context.loggedIn) {
          if (discussion.avatarOne.assignedToUserId === this.context.authUser.id)
            this.setState({ avatarSelect: [...this.state.avatarSelect, {
              text: discussion.avatarOne.name,
              value: discussion.avatarOne.id,
              image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/large/matthew.png' },
            }]})
          if (discussion.avatarTwo.assignedToUserId === this.context.authUser.id)
            this.setState({ avatarSelect: [...this.state.avatarSelect, {
              text: discussion.avatarTwo.name,
              value: discussion.avatarTwo.id,
              image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/large/matthew.png' },
            }]})
        }
      })
  }

  componentWillUnmount() {
    // Pass discussion Id to CurrentSessionContext
    this.props.getDiscussionId(this.state.discussion.id)
  }

  render() {

    if (!this.state.isDiscussionLoaded) {
      return (
        <Segment style={{minHeight: '90.5vh'}}>
          <Dimmer active inverted>
            <Loader inverted size='massive'>Cargando</Loader>
          </Dimmer>
        </Segment>
      );
    }

    return (
      <div style={{backgroundColor: '#eee'}}>

        <Responsive maxWidth={1650}>
          <Headroom>
              <br/>
              <Container>
                <Menu stackable>
                  <Menu.Item className='botonMenu' name='titulo' active={false} onClick={this.handleItemClick} >
                    <Link activeClass="active" className="test1" to="test1" spy={true} smooth={true} duration={500} style={{color:'black'}}>Título</Link>
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
                  {this.context.loggedIn && (this.context.authUser.id === this.state.discussion.avatarOne.assignedToUserId || this.context.authUser.id === this.state.discussion.avatarTwo.assignedToUserId) && !this.state.textEditorSidebarVisibility &&
                    <Menu.Item>
                      <Button icon labelPosition='left' primary size='small' onClick={this.handleTextEditorSidebarVisibility}>
                        <Icon name='add' /> Añadir argumento
                      </Button>
                    </Menu.Item>}
                  {this.context.loggedIn && (this.context.authUser.id === this.state.discussion.avatarOne.assignedToUserId || this.context.authUser.id === this.state.discussion.avatarTwo.assignedToUserId) && !this.state.textEditorSidebarVisibility && this.context.authUser.id === this.state.discussion.ownerUserId &&
                    <Menu.Item>
                      <InviteButton discussionId={this.state.discussion.id}/>
                    </Menu.Item>}
                </Menu>
              </Container>
          </Headroom>
        </Responsive>

        <Element name="test1" className="element" >
          <Segment>
            <Container>

                <br/>
                <h1>{this.state.discussion.topicTitle}</h1>
                <p>
                  {this.state.discussion.topicDescription}
                </p>
                <br/>

            </Container>
          </Segment>
          <br/>
        </Element>

        <Container>
          <div ref={this.argumentsRef}>
            <Responsive minWidth={1650}>
              <Rail position='right'>
                <Sticky offset={100} context={this.argumentsRef.current} active={false}>
                  <Menu vertical>
                    <Menu.Item className='botonMenu' name='titulo' active={false} onClick={this.handleItemClick} >
                      <Link activeClass="active" className="test1" to="test1" spy={true} smooth={true} duration={500} style={{color:'black'}}>Título</Link>
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
                    {this.context.loggedIn && (this.context.authUser.id === this.state.discussion.avatarOne.assignedToUserId || this.context.authUser.id === this.state.discussion.avatarTwo.assignedToUserId) && !this.state.textEditorSidebarVisibility &&
                      <Menu.Item>
                        <Button icon labelPosition='left' primary size='small' onClick={this.handleTextEditorSidebarVisibility}>
                          <Icon name='add' /> Argumento
                        </Button>
                      </Menu.Item>
                    }
                    {this.context.loggedIn && (this.context.authUser.id === this.state.discussion.avatarOne.assignedToUserId || this.context.authUser.id === this.state.discussion.avatarTwo.assignedToUserId) && !this.state.textEditorSidebarVisibility && this.context.authUser.id === this.state.discussion.ownerUserId &&
                      <Menu.Item>
                        <InviteButton discussionId={this.state.discussion.id}/>
                      </Menu.Item>}
                  </Menu>
                </Sticky>
              </Rail>
            </Responsive>
            <Card fluid>
              <br/>
              <Element name="test2" className="element" >
                <Container>
                  <Row>
                    <Col sm={1}/>
                    <Col sm={4}>
                      {this.state.discussion.avatarOne &&
                      <Avatar
                        avatar={this.state.discussion.avatarOne}
                        participantsIds={this.state.discussion.participants}
                        discussionId={this.state.discussion.id}
                        ownerUserId={this.state.discussion.ownerUserId}/>}
                    </Col>
                    <Col sm={2}/>
                    <Col sm={4}>
                      {this.state.discussion.avatarTwo &&
                      <Avatar
                        avatar={this.state.discussion.avatarTwo}
                        participantsIds={this.state.discussion.participants}
                        discussionId={this.state.discussion.id}
                        ownerUserId={this.state.discussion.ownerUserId}/>}
                    </Col>
                    <Col sm={1}/>
                  </Row>
                </Container>
                <br/>
                <Container>
                  {this.state.discussion.arguments && this.state.discussion.arguments.map((item) => (
                     <Argument key={item.num} argument={item} avatarOneId={this.state.discussion.avatarOne.id}/>
                  ))}
                  <br/>
                </Container>
              </Element>

              <Element name="scroll-to-new-argument" className="element"/>

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
                          avatarOne={this.state.discussion.avatarOne}
                          avatarTwo={this.state.discussion.avatarTwo}
                          passAcceptClick={this.handleAcceptedAgreement}
                          passRejectClick={this.handleRejectedAgreement}
                        />
                      ))}
                      {this.context.loggedIn && (this.context.authUser.id === this.state.discussion.avatarOne.assignedToUserId || this.context.authUser.id === this.state.discussion.avatarTwo.assignedToUserId) &&
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
                      }
                    </Table.Body>
                    {this.context.loggedIn && (this.context.authUser.id === this.state.discussion.avatarOne.assignedToUserId || this.context.authUser.id === this.state.discussion.avatarTwo.assignedToUserId) && !this.state.agreePointVisibility &&
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
                    }
                  </Table>
                </Container>
              </Element>
            </Card>
          </div>
        </Container>

        <Container>
          <TextEditorSidebar
            visible={this.state.textEditorSidebarVisibility}
            avatarOne={this.state.discussion.avatarOne}
            avatarTwo={this.state.discussion.avatarTwo}
            passClick={this.handleSendArgument}
            passClickClose={this.handleHideTextEditorSidebar}
            avatarSelect={this.state.avatarSelect}
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

DiscussionPage.contextType = AuthContext

export default DiscussionPage;
