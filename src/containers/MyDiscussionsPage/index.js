import React, { Component } from 'react';

//API
import API from '../../services/api/app';

// React Context API
import AuthContext from "../../AuthContext";

//Routing
import { Link } from 'react-router-dom';

//UI framework
import { Container } from 'react-grid-system';
import { Segment } from 'semantic-ui-react';

class MyDiscussionsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      discussions: []
    };
  }

  componentDidMount() {
    if (this.context.loggedIn)
      API.getMyDiscussions(this.context.authUser.token)
      .then(result => {
        console.log(result.discussions);
        this.setState({discussions: result.discussions})
      })
  }

  render() {
    return (
      <div style={{backgroundColor: '#eee'}}>
        <Container>
          <br/>
          <Segment>
            <ul>
              {this.state.discussions && this.state.discussions.map((discussion) => (
                <li key={discussion.id}>
                  <Link to={'discussion/'+discussion.id}> {discussion.topicTitle} </Link> by @{discussion.owner.name}
                </li>
              ))}
            </ul>
          </Segment>
        </Container>
      </div>
    );
  }
}

MyDiscussionsPage.contextType = AuthContext

export default MyDiscussionsPage;
