import React, { Component } from 'react';
import './styles.css'

//Components
import Argument from '../../components/Argument';
import Agreement from '../../components/Agreement';
import Avatar from '../../components/Avatar';
import TextEditorSidebar from '../../components/TextEditorSidebar';

//API
import API from '../../services/api/app';

//UI framework
import Headroom from 'react-headroom';
import { Link, Element} from 'react-scroll';

import { Container, Row, Col } from 'react-grid-system';
import { Table, Card, Button, Icon, Header, Segment, Menu, Input } from 'semantic-ui-react';

class DiscussionPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      discussion: {},
      textEditorSidebarVisibility: false
    };
    //this.handleClick = this.handleClick.bind(this);
  }

  handleTextEditorSidebarVisibility = () => {
    this.setState({ textEditorSidebarVisibility: !this.state.textEditorSidebarVisibility })
  }

  handleSendArgument = (who, textContent) => {
    API.sendArgument(this.state.discussion.id, {
      'user_id': 1,
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

  componentDidMount() {
    //API calls here
    API.getDiscussion(this.props.id)
      .then(discussion => {
        this.setState({discussion: discussion});
      })
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
              <Menu.Item
              >
                <Button icon labelPosition='left' primary size='small' onClick={this.handleTextEditorSidebarVisibility}>
                  <Icon name='add' /> Añadir argumento
                </Button>
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
                      <Agreement point={item} isAgree={item.isAgree}/>
                    ))}
                  </Table.Body>
                  <Table.Footer fullWidth>
                    <Table.Row>
                      <Table.HeaderCell />
                      <Table.HeaderCell colSpan='4'>
                        <Button floated='right' icon labelPosition='left' primary size='small'>
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

      </div>
    );
  }
}

export default DiscussionPage;
