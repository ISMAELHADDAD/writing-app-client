import React, { Component } from 'react';

//Components
import DiscussionItem from '../../components/DiscussionItem';
import NewDiscussionButton from '../../components/NewDiscussionButton';

//API
import API from '../../services/api/app';

// React Context API
import AuthContext from "../../AuthContext";

//UI framework
import { Container } from 'react-grid-system';
import { Segment, Header, Item, Pagination } from 'semantic-ui-react';

class DiscussionsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      discussions: [],
      pages: {
        current: 1,
        total: 1
      },
      loggedIn: false
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
        this.props.getDiscussionId(0)
      })
  }

  handleOnPageChange = (event, data) => {
    if (data.activePage !== this.state.pages.current)
      this.populateList(data.activePage)
  }

  populateList = (page) => {
    if (this.props.isMyDiscussions){
      if (this.context.loggedIn)
        API.getMyDiscussions(this.context.authUser.token, page, this.context.authUser.id)
        .then(result => {
          this.setState({discussions: result.discussions,  pages: result.pages})
        })
    }
    else {
      API.getPublicDiscussions(page)
      .then(result => {
        this.setState({discussions: result.discussions, pages: result.pages})
      })
    }
  }

  componentDidMount() {
    this.populateList(1)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isMyDiscussions) {
      if (this.context.loggedIn && prevState.loggedIn !== this.context.loggedIn)
        API.getMyDiscussions(this.context.authUser.token, this.state.pages.current, this.context.authUser.id)
        .then(result => {
          this.setState({discussions: result.discussions, loggedIn: true})
        })

      if (!this.context.loggedIn && prevState.loggedIn !== this.context.loggedIn)
        this.setState({loggedIn: false})
    }

    if (this.props.isMyDiscussions !== prevProps.isMyDiscussions) {
      this.populateList(1)
    }
  }

  render() {

    let topicList
    if (this.state.discussions.length < 1 || (!this.context.loggedIn && this.props.isMyDiscussions)) {
      topicList =
        <Container style={{textAlign: 'center'}}>
          <br/>
          <Header as='h2' disabled>
            No hay discusiones
          </Header>
        </Container>
    } else {
      topicList =
        <Item.Group divided>
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
            {this.context.loggedIn &&
            <NewDiscussionButton history={this.props.history}/>}

            {topicList}
          </Segment>
          <br/>
          <Pagination defaultActivePage={this.state.pages.current} totalPages={this.state.pages.total} onPageChange={this.handleOnPageChange}/>
        </Container>
      </div>
    );
  }
}

DiscussionsPage.contextType = AuthContext

export default DiscussionsPage;
