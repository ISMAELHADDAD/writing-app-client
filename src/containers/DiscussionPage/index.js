import React, { Component } from 'react';
import logo from '../../logo.svg'
import Argument from '../../components/Argument';
import Agreement from '../../components/Agreement';
import Avatar from '../../components/Avatar';

import API from '../../services/api/app';

import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Heading, Container, Section, Box, Columns, Table } from 'react-bulma-components';

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
    this.setState({discussion: API.getDiscussion(this.props.id)})
  }

  render() {
    return (
      <div>
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
               <Argument key={item.num} num={item.num} from={item.from} argument={item.content}/>
            ))}
          </Container>
        </Section>

        <Section style={{backgroundColor: '#D8D8D8'}}>
          <Container>
            <Box>
              <Heading subtitle size={3} style={{textAlign: 'center'}}>Tabla de puntos en acuerdo y en desacuerdo</Heading>
              <Table>
                <tbody>
                  {this.state.discussion.pointsOfAgreement && this.state.discussion.pointsOfAgreement.map((item) => (
                    <Agreement point={item} isAgree={true}/>
                  ))}
                  {this.state.discussion.pointsOfDisagreement && this.state.discussion.pointsOfDisagreement.map((item) => (
                    <Agreement point={item} isAgree={false}/>
                  ))}
                </tbody>
              </Table>
            </Box>
          </Container>
        </Section>
      </div>
    );
  }
}

export default DiscussionPage;
