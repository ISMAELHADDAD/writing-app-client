import React, { Component } from 'react';

//Components
import DiscussionItem from '../../components/DiscussionItem';

//API
import API from '../../services/api/app';

// React Context API
import AuthContext from "../../AuthContext";

//UI framework
import { Container } from 'react-grid-system';
import { Segment, Header, Item, Pagination } from 'semantic-ui-react';

class ExplorePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      discussions: [],
      pages: {
        current: 1,
        total: 1
      }
    };
  }

  handleOnClickDelete = (id) => {
    if (this.context.loggedIn)
      API.deleteDiscussion(this.context.authUser.token, id)
      .then(result => {
        this.setState({
          discussions: this.state.discussions
            .filter(i => i.id !== id)
        })
      })
  }

  handleOnPageChange = (event, data) => {
    if (data.activePage !== this.state.pages.current)
      API.getPublicDiscussions(1)
      .then(result => {
        this.setState({discussions: result.discussions, pages: result.pages})
      })
  }

  componentDidMount() {
    API.getPublicDiscussions(1)
    .then(result => {
      this.setState({discussions: result.discussions, pages: result.pages})
    })
  }

  render() {

    let topicList
    if (this.state.discussions.length < 1) {
      topicList =
        <Container style={{textAlign: 'center'}}>
          <br/>
          <Header as='h2' disabled>
            No hay discusiones
          </Header>
        </Container>
    } else {
      topicList =
        <Item.Group link divided>
          {this.state.discussions && this.state.discussions.map((discussion) => (
            <DiscussionItem key={discussion.id} discussion={discussion} passClickDelete={this.handleOnClickDelete}/>
          ))}
        </Item.Group>
    }

    return (
      <div style={{backgroundColor: '#eee', minHeight: '90.5vh'}}>
        <Container>
          <br/>
          <Segment>
            {topicList}
          </Segment>
          <br/>
          <Pagination defaultActivePage={this.state.pages.current} totalPages={this.state.pages.total} onPageChange={this.handleOnPageChange}/>
        </Container>
      </div>
    );
  }
}

ExplorePage.contextType = AuthContext

export default ExplorePage;
