import React, { Component } from 'react';

//Images
import logo from '../../logo.svg'
import logoHub from '../../ideasHub_2.png'
import landscape from '../../landscape.png'

//Components
import Argument from '../../components/Argument';
import Agreement from '../../components/Agreement';
import Avatar from '../../components/Avatar';

//API
import API from '../../services/api/app';

//UI framework
import Headroom from 'react-headroom';
import { Link, Element} from 'react-scroll';

import { Container, Row, Col } from 'react-grid-system';
import { Table, Card, Button, Icon } from 'semantic-ui-react';

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
      <div style={{backgroundColor: '#eee'}}>
        <Headroom style={{backgroundColor: '#00d1b2'}}>
          <Container>
            <img
              src={logoHub}
              alt="Ideas hub: Plataforma para recopilar tus ideas"
              width="112"
              height="28"
            />
            <Link activeClass="active" className="test1" to="test1" spy={true} smooth={true} duration={500} style={{color:'white'}}>Titulo</Link>
            <Link activeClass="active" className="test2" to="test2" spy={true} smooth={true} duration={500} style={{color:'white'}}>Argumentos</Link>
            <Link activeClass="active" className="test3" to="test3" spy={true} smooth={true} duration={500} style={{color:'white'}}>Puntos de concordancia</Link>

          </Container>
        </Headroom>

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
                <h1 style={{textAlign: 'center'}}>Tabla de puntos en acuerdo y en desacuerdo</h1>
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
                          <Icon name='add' /> Add Point
                        </Button>
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>
              </Container>
            </Element>
          </Card>
        </Container>
      </div>
    );
  }
}

export default DiscussionPage;
