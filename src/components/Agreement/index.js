import React, { Component } from 'react';

// React Context API
import AuthContext from "../../AuthContext";

//Utils
import moment from 'moment';
import 'moment/locale/es';

//UI framework
import { Table, Icon, Card, Button } from 'semantic-ui-react';

class Agreement extends Component {

  constructor(props) {
    super(props);
    moment.locale('es');
  }

  // If I'm owner of Avatar X && Avatar X didn't proposed
  checkAvatarOwnership = (x) => {
    if (x !== undefined && x !== null)
      return (x.assignedToUserId === this.context.authUser.id
        && this.props.point.proposedByAvatar.id !== x.id)
  }

  handleAcceptClick = () => {
    if (this.checkAvatarOwnership(this.props.avatarOne))
      this.props.passAcceptClick(this.props.point.id, this.props.avatarOne.id)
    else if (this.checkAvatarOwnership(this.props.avatarTwo))
      this.props.passAcceptClick(this.props.point.id, this.props.avatarTwo.id)
  };

  handleRejectClick = () => {
    if (this.checkAvatarOwnership(this.props.avatarOne))
      this.props.passRejectClick(this.props.point.id, this.props.avatarOne.id)
    else if (this.checkAvatarOwnership(this.props.avatarTwo))
      this.props.passRejectClick(this.props.point.id, this.props.avatarTwo.id)
  };

  render() {
    let acceptedAt = new Date(this.props.point.acceptedAt)

    if (!this.props.point.isAccepted && !this.context.loggedIn)
      return null

    let dialog;
    if (!this.props.point.isAccepted
        && ( (this.checkAvatarOwnership(this.props.avatarOne)) || (this.checkAvatarOwnership(this.props.avatarTwo)) ))
    {
      dialog = <Card style={{margin: '0 auto'}}>
                <Card.Content>
                  <Card.Description>
                    <strong>{this.props.point.proposedByAvatar.name}</strong> a propuesto esto:
                  </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button basic color='green' onClick={this.handleAcceptClick}>
                      Aceptar
                    </Button>
                    <Button basic color='red' onClick={this.handleRejectClick}>
                      Rechazar
                    </Button>
                  </div>
                </Card.Content>
              </Card>
    } else if (!this.props.point.isAccepted) {
      dialog = <Card style={{margin: '0 auto'}}>
                <Card.Content>
                  <Card.Description>
                    Esperando respuesta
                  </Card.Description>
                </Card.Content>
              </Card>
    } else {
      dialog =
        <Button color='green' disabled={true}>Aceptado {moment(acceptedAt).fromNow()}</Button>
    }

    return (
        <Table.Row positive={this.props.isAgree} negative={!this.props.isAgree}>
          <Table.Cell style={{textAlign: window.innerWidth > 770? null: 'center'}}>{this.props.isAgree ? (<Icon color='green' name='checkmark' size='large' />):(<Icon color='red' name='times' size='large' />)}</Table.Cell>
          <Table.Cell style={{textAlign: window.innerWidth > 770? null: 'center'}}>{this.props.point.content}</Table.Cell>
          <Table.Cell collapsing style={{textAlign: 'center'}}>
            {dialog}
          </Table.Cell>
        </Table.Row>
    );
  }
}

Agreement.contextType = AuthContext

export default Agreement;
