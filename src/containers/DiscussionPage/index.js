import React, { Component } from 'react';
import logo from '../../logo.svg'
import logoHub from '../../ideasHub_2.png'
import Argument from '../../components/Argument';
import Agreement from '../../components/Agreement';
import Avatar from '../../components/Avatar';

import API from '../../services/api/app';

import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Heading, Container, Section, Box, Columns, Table, Navbar } from 'react-bulma-components';
import Headroom from 'react-headroom';
import { Link, Element} from 'react-scroll'

class DiscussionPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      discussion: {}
    };
    //this.handleClick = this.handleClick.bind(this);
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
      <div>
        <Headroom style={{backgroundColor: '#00d1b2'}}>
          <Container>
          <Navbar
            color={'primary'}
            active={true}
          >
            <Navbar.Brand>
              <Navbar.Item renderAs="a" href="#">
                <img
                  src={logoHub}
                  alt="Bulma: a modern CSS framework based on Flexbox"
                  width="112"
                  height="28"
                />
              </Navbar.Item>
            </Navbar.Brand>
              <Navbar.Menu active={true}>
                <Navbar.Container>
                  <Navbar.Item href="#"><Link activeClass="active" className="test1" to="test1" spy={true} smooth={true} duration={500} style={{color:'white'}}>Titulo</Link></Navbar.Item>
                  <Navbar.Item href="#"><Link activeClass="active" className="test2" to="test2" spy={true} smooth={true} duration={500} style={{color:'white'}}>Argumentos</Link></Navbar.Item>
                  <Navbar.Item href="#"><Link activeClass="active" className="test3" to="test3" spy={true} smooth={true} duration={500} style={{color:'white'}}>Puntos de concordancia</Link></Navbar.Item>
                </Navbar.Container>
              </Navbar.Menu>
          </Navbar>
        </Container>
        </Headroom>

        <Element name="test1" className="element" >
          <Section style={{backgroundColor: '#FFFFEA'}}>
            <Container>

              <p>
                <Heading>{this.state.discussion.topicTitle}</Heading>
                <Heading subtitle size={6}>
                  {this.state.discussion.topicDescription}
                </Heading>
              </p>

            </Container>
          </Section>
        </Element>

        <Element name="test2" className="element" >
          <Section style={{backgroundColor: '#08B2E3'}}>
            <Container>
              <Columns>
                <Columns.Column size={1}/>
                <Columns.Column size={4}>
                  {this.state.discussion.avatarOne &&
                  <Avatar avatar={this.state.discussion.avatarOne}/>}
                </Columns.Column>
                <Columns.Column size={2}/>
                <Columns.Column size={4}>
                  {this.state.discussion.avatarTwo &&
                  <Avatar avatar={this.state.discussion.avatarTwo}/>}
                </Columns.Column>
                <Columns.Column size={1}/>
               </Columns>
            </Container>

            <Container>
              {this.state.discussion.arguments && this.state.discussion.arguments.map((item) => (
                 <Argument key={item.num} argument={item} avatarOneID={this.state.discussion.avatarOne.id}/>
              ))}
            </Container>
          </Section>
        </Element>

        <Element name="test3" className="element" >
          <Section style={{backgroundColor: '#D8D8D8'}}>
            <Container>
              <Box>
                <Heading subtitle size={3} style={{textAlign: 'center'}}>Tabla de puntos en acuerdo y en desacuerdo</Heading>
                <Table>
                  <tbody>
                    {this.state.discussion.agreements && this.state.discussion.agreements.map((item) => (
                      <Agreement point={item} isAgree={item.isAgree}/>
                    ))}
                  </tbody>
                </Table>
              </Box>
            </Container>
          </Section>
        </Element>
      </div>
    );
  }
}

export default DiscussionPage;
