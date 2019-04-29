import React, { Component } from 'react';

//API
import API from '../../services/api/app';

// React Context API
import AuthContext from "../../AuthContext";

//Utils
import moment from 'moment';
import 'moment/locale/es';

//UI framework
import { Container } from 'react-grid-system';
import { Sidebar, Segment, Button, Icon, Divider, Header, Comment, List, Rating } from 'semantic-ui-react'

class RatingsSidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ratings: [],
      totalRating: 0
    };
    moment.locale('es');
  }

  updateTotalRating = () => {
    let sum = 0
    this.state.ratings.forEach(r => {
      sum += r.rating
    })
    let avg = Math.ceil(sum/this.state.ratings.length)
    this.setState({ totalRating: avg })
  }

  handleClickClose = () => {
    this.props.passClickClose()
  }

  handleRate = (ratingValue, ratingId) => {
    API.setRating(this.context.authUser.token, this.props.discussionId, this.props.avatarId, ratingId, {rating: ratingValue})
    .then(newRating => {
      this.setState({ratings: this.state.ratings.map(rating => (rating.id === newRating.id)? newRating : rating) })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.visible && prevProps.visible !== this.props.visible)
      API.getRatings(this.props.discussionId, this.props.avatarId)
      .then(ratings => {this.setState({ratings: ratings })})

    if (prevState.ratings !== this.state.ratings)
      this.updateTotalRating()
  }

  render() {
    return (
      <Sidebar as={Segment}
        animation={'overlay'}
        direction={'left'}
        visible={this.props.visible}
        width="very wide"
        style={{width: window.innerWidth > 770? null:'100%'}}
        >
        <Container>

          <Button basic icon='angle left' floated='right' onClick={this.handleClickClose}/>

          <Comment.Group>

            <Header as='h3'>
              <Icon name='star' />
              <Header.Content>Valoración</Header.Content>
            </Header>
            <Divider/>
            <p style={{color: 'grey', marginBottom: '25px', textAlign: 'justified'}}>
              Aquí se muestran las valoraciones para cada criterio.
              {this.context.loggedIn && this.context.authUser.id === this.props.ownerId? ' Asigna las estrellas que hagan falta para valorar.':null}
            </p>

            <Header as='h1' textAlign='center'>
              Total: <Rating disabled maxRating={5} rating={this.state.totalRating} icon='star' size='massive' />
            </Header>

            <List bulleted size='medium' relaxed='very'>
              {this.state.ratings.length > 0 ?
                this.state.ratings.map((item) => (
                  <List.Item key={item.criterium.id}>
                    {item.criterium.text}
                    <br/>
                    <br/>
                    <b>Valoración:</b> <Rating disabled={!this.context.loggedIn} maxRating={5} defaultRating={item.rating} icon='star' onRate={(e, {rating}) => this.handleRate(rating,item.id)}/>
                  </List.Item>
                ))
                :
                <Header disabled textAlign='center'>
                   La lista esta vacia
                </Header>
              }
            </List>

            <br/>
            <Divider/>

          </Comment.Group>

        </Container>
      </Sidebar>
    );
  }
}

RatingsSidebar.contextType = AuthContext

export default RatingsSidebar;
