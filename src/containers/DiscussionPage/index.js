import React, { Component } from 'react';
import './styles.css'

//Components
import Argument from '../../components/Argument';
import Agreement from '../../components/Agreement';
import Avatar from '../../components/Avatar';
import TextEditorSidebar from '../../components/TextEditorSidebar';
import GeneralCommentsSidebar from '../../components/GeneralCommentsSidebar';
import InviteButton from '../../components/InviteButton';

//API
import API from '../../services/api/app';

// React Context API
import AuthContext from "../../AuthContext";

//Routing
import { Link as LinkRouter } from 'react-router-dom';

//Utils
import moment from 'moment';
import 'moment/locale/es';

//Sockets
import Cable from 'actioncable';

//UI framework
import { Link, Element, scroller} from 'react-scroll';

import { Container, Row, Col } from 'react-grid-system';
import { Table, Card, Button, Icon, Header, Menu, TextArea, Form, Dropdown,
  Rail, Sticky, Responsive, Segment, Dimmer, Loader, Visibility, Label, Image, Popup, Divider} from 'semantic-ui-react';

class DiscussionPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDiscussionLoaded: false,
      discussion: {},
      textEditorSidebarVisibility: false,
      commentsSidebarVisibility: false,
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
      loggedIn: false,
      fixedMenu: false
    };
    this.argumentsRef = React.createRef()
    moment.locale('es');

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
      this.updateAvatarSelect(this.state.discussion)
    }
  }

  updateAvatarSelect(discussion) {
    if (this.context.loggedIn && discussion.avatarOne && discussion.avatarTwo) {
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
  }

  handleTextEditorSidebarVisibility = () => this.setState({ textEditorSidebarVisibility: true })

  handleHideTextEditorSidebar = () => this.setState({ textEditorSidebarVisibility: false })

  handleShowCommentsSidebar = () => this.setState({ commentsSidebarVisibility: true })

  handleHideCommentsSidebar = () => this.setState({ commentsSidebarVisibility: false })

  scrollToNewArgument() {
    scroller.scrollTo('scroll-to-new-argument', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -300
    })
  }

  handleAgreePointVisibility = () => this.setState({ agreePointVisibility: true })

  handleAgreePointChangeSelect = (event, data) => this.setState({ isAgree: data.value, validAgree: true })

  handleAgreePointAvatarChangeSelect = (event, data) => this.setState({ whoProposed: data.value, validAvatar: true })

  handleAgreePointChangeText = (event, data) => this.setState({ proposedText: data.value })

  handleSendArgument = (who, textContent) => {
    API.sendArgument(this.context.authUser.token,this.state.discussion.id, {
      'user_id': this.context.authUser.id,
      'avatar_id': who,
      'content': textContent
    })
    .catch(error => {
      this.props.history.push('/error')
    })
  }

  handleSendAgreement = () => {
    API.sendAgreement(this.context.authUser.token, this.state.discussion.id, {
      'user_id': this.context.authUser.id,
      'avatar_id': this.state.whoProposed,
      'content': this.state.proposedText,
      'is_agree': this.state.isAgree
    })
    .catch(error => {
      this.props.history.push('/error')
    })
  }

  handleRejectedAgreement = (agreementId, avatarId) => {
    API.rejectAgreement(this.context.authUser.token, this.state.discussion.id, agreementId, {
      'user_id': this.context.authUser.id,
      'avatar_id': avatarId,
      'is_accepted': "false"
    })
    .catch(error => {
      this.props.history.push('/error')
    })
  }

  handleAcceptedAgreement = (agreementId, avatarId) => {
    API.acceptAgreement(this.context.authUser.token, this.state.discussion.id, agreementId, {
      'user_id': this.context.authUser.id,
      'avatar_id': avatarId,
      'is_accepted': "true"
    })
    .catch(error => {
      this.props.history.push('/error')
    })
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
        //Update avatarSelect
        this.updateAvatarSelect(discussion)
        //Get info of discussion from which was forked
        if (discussion.forkedFrom) {
          API.getDiscussion(discussion.forkedFrom)
            .then(d => {
              let parentDiscussion = '@' + d.owner.name + '/' + d.topicTitle
              this.setState({parentDiscussion: parentDiscussion})
            })
        }
        //Populate arguments
        API.getDiscussionArguments(this.props.match.params.id)
          .then(arrayOfArguments => {
            this.setState({
              discussion: {
                ...this.state.discussion,
                arguments: arrayOfArguments
              }
            })
          })
        //Populate agreements
        API.getDiscussionAgreements(this.props.match.params.id)
          .then(arrayOfAgreements => {
            this.setState({
              discussion: {
                ...this.state.discussion,
                agreements: arrayOfAgreements
              }
            })
          })
      })
  }

  componentWillUnmount() {
    // Pass discussion Id to CurrentSessionContext
    this.props.getDiscussionId(this.state.discussion.id)
  }

  componentDidUpdate(prevProps,prevState) {
    if (prevState.avatarSelect !== this.state.avatarSelect)
      if (this.state.avatarSelect.length > 0)
        this.setState({ whoProposed: this.state.avatarSelect[0].value, validAvatar: true })

    if (this.context.loggedIn !== this.state.loggedIn) {
      this.setState({loggedIn: this.context.loggedIn})
      //Update avatarSelect
      this.updateAvatarSelect(this.state.discussion)
    }
  }

  render() {

    let publishTime = new Date(this.state.discussion.publishTime)

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
          <Visibility
            once={false}
            onTopPassed={() => this.setState({ fixedMenu: true })}
            onTopPassedReverse={() => this.setState({ fixedMenu: false })}
          >
            <div style={{minHeight: '6vh'}}>
              <Menu fixed={this.state.fixedMenu ? 'top' : null}>
                  {window.innerWidth > 770 &&
                  <Menu.Item className='botonMenu' name='titulo' active={false} onClick={this.handleItemClick} >
                    <Link activeClass="active" className="test1" to="test1" spy={true} smooth={true} duration={500} style={{color:'black'}}>Título</Link>
                  </Menu.Item>}
                  {window.innerWidth > 770 &&
                  <Menu.Item className='botonMenu'
                    name='argumentos'
                    active={false}
                    onClick={this.handleItemClick}
                  >
                    <Link activeClass="active" className="test2" to="test2" spy={true} smooth={true} duration={500} style={{color:'black'}}>Argumentos</Link>
                  </Menu.Item>}
                  {window.innerWidth > 770 &&
                  <Menu.Item className='botonMenu'
                    name='puntos de concordancia'
                    active={false}
                    onClick={this.handleItemClick}
                  >
                    <Link activeClass="active" className="test3" to="test3" spy={true} smooth={true} duration={500} style={{color:'black'}}>Puntos de concordancia</Link>
                  </Menu.Item>}
                {this.context.loggedIn && (this.context.authUser.id === this.state.discussion.avatarOne.assignedToUserId || this.context.authUser.id === this.state.discussion.avatarTwo.assignedToUserId) && !this.state.textEditorSidebarVisibility &&
                  <Menu.Item>
                    <Button icon labelPosition='left' primary size='small' onClick={this.handleTextEditorSidebarVisibility}>
                      <Icon name='add' /> Añadir argumento
                    </Button>
                  </Menu.Item>}
                {this.context.loggedIn && (this.context.authUser.id === this.state.discussion.avatarOne.assignedToUserId || this.context.authUser.id === this.state.discussion.avatarTwo.assignedToUserId) && !this.state.textEditorSidebarVisibility && this.context.authUser.id === this.state.discussion.owner.id &&
                  <Menu.Item>
                    <InviteButton fluid={false} discussionId={this.state.discussion.id}/>
                  </Menu.Item>}
              </Menu>
            </div>
          </Visibility>
        </Responsive>

        <Element name="test1" className="element" >
          <Segment>
            <Container>

                <br/>
                <h1>{this.state.discussion.topicTitle}  {this.state.discussion.forkedFrom && this.state.parentDiscussion &&
                <Popup
                  trigger={
                    <Label as={LinkRouter} to={'/discussion/'+this.state.discussion.forkedFrom} color='blue' tag style={{bottom: '6px'}}>
                      Forked from
                    </Label>
                  }
                  content={this.state.parentDiscussion}
                  inverted
                />}</h1>
                <p>
                  {this.state.discussion.topicDescription}
                </p>
                <Divider/>

                <Button basic floated='right' onClick={this.handleShowCommentsSidebar}>
                  <Icon name='comment'/>
                  Comentarios
                </Button>

                <Image floated='left' size='mini' src={this.state.discussion.owner.imageUrl} />
                @{this.state.discussion.owner.name}
                <Popup
                  trigger={<p>Publicado {moment(publishTime).fromNow()}</p>}
                  content={moment(publishTime).format('LLLL')}
                  inverted
                />

            </Container>
          </Segment>
          <br/>
        </Element>

        <Container>
          <div ref={this.argumentsRef}>
            <Responsive minWidth={1650}>
              <Rail position='right' style={{zIndex: 0}}>
                <Sticky offset={100} context={this.argumentsRef.current} active={true}>
                  <Menu vertical>
                    <Menu.Item>
                      <Menu.Menu>
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
                      </Menu.Menu>
                    </Menu.Item>
                    {this.context.loggedIn && (this.context.authUser.id === this.state.discussion.avatarOne.assignedToUserId || this.context.authUser.id === this.state.discussion.avatarTwo.assignedToUserId) && !this.state.textEditorSidebarVisibility &&
                      <Menu.Item>
                        <Button icon fluid labelPosition='left' primary size='small' onClick={this.handleTextEditorSidebarVisibility}>
                          <Icon name='add' /> Argumento
                        </Button>
                      </Menu.Item>
                    }
                    {this.context.loggedIn && (this.context.authUser.id === this.state.discussion.avatarOne.assignedToUserId || this.context.authUser.id === this.state.discussion.avatarTwo.assignedToUserId) && !this.state.textEditorSidebarVisibility && this.context.authUser.id === this.state.discussion.owner.id &&
                      <Menu.Item>
                        <InviteButton fluid={true} discussionId={this.state.discussion.id}/>
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
                        ownerUserId={this.state.discussion.owner.id}/>}
                    </Col>
                    <Col sm={2}/>
                    <Col sm={4}>
                      {this.state.discussion.avatarTwo &&
                      <Avatar
                        avatar={this.state.discussion.avatarTwo}
                        participantsIds={this.state.discussion.participants}
                        discussionId={this.state.discussion.id}
                        ownerUserId={this.state.discussion.owner.id}/>}
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
                      {this.context.loggedIn && (this.context.authUser.id === this.state.discussion.avatarOne.assignedToUserId || this.context.authUser.id === this.state.discussion.avatarTwo.assignedToUserId) && this.state.agreePointVisibility &&
                        <Table.Row>
                          <Table.Cell colSpan='3'>
                            <Row>
                              <Col sm={2} style={{margin: '5px'}}>
                                <Dropdown compact placeholder='Tipo' selection options={this.state.agreeSelect} onChange={this.handleAgreePointChangeSelect}/>
                                <br/>
                              </Col>
                              <Col sm={3} style={{margin: '5px'}}>
                                {this.state.avatarSelect.length > 0 &&
                                <Dropdown placeholder='Selecciona el avatar' selection options={this.state.avatarSelect} defaultValue={this.state.avatarSelect[0].value} onChange={this.handleChangeSelect}/>}
                                <br/>
                              </Col>
                              <Col sm={7} style={{margin: '5px'}}>
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
                  </Table>
                  {this.context.loggedIn && (this.context.authUser.id === this.state.discussion.avatarOne.assignedToUserId || this.context.authUser.id === this.state.discussion.avatarTwo.assignedToUserId) && !this.state.agreePointVisibility &&
                    <Button style={{marginBottom: '10px'}} floated='right' icon labelPosition='left' primary size='small' onClick={this.handleAgreePointVisibility}>
                    <Icon name='add' /> Añadir punto
                  </Button>}
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

        <GeneralCommentsSidebar
          visible={this.state.commentsSidebarVisibility}
          passClickClose={this.handleHideCommentsSidebar}
          discussionId={this.state.discussion.id}
        />

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
