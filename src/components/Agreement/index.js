import React, { Component } from 'react';

//UI framework
import { Table, Icon, Card, Button } from 'semantic-ui-react';

class Agreement extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleAcceptClick = () => {
    this.props.user_avatars.forEach(aID => {
      if (aID !== this.props.point.proposed_by_AvatarID)
        this.props.passAcceptClick(this.props.point.id, aID);
    });
  };

  handleRejectClick = () => {
    this.props.user_avatars.forEach(aID => {
      if (aID !== this.props.point.proposed_by_AvatarID)
        this.props.passRejectClick(this.props.point.id, aID);
    });
  };

  render() {

    let dialog;
    if (!this.props.point.isAccepted && this.props.user_avatars.includes(this.props.point.proposed_by_AvatarID)) {
      dialog = <Card>
                <Card.Content>
                  <Card.Description>
                    <strong>{this.props.point.proposed_by_AvatarName}</strong> a propuesto esto:
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
      dialog = <Card>
                <Card.Content>
                  <Card.Description>
                    Esperando respuesta
                  </Card.Description>
                </Card.Content>
              </Card>
    } else {
      dialog = <Button color='green' disabled={true}>Aceptado</Button>
    }

    return (
      <Table.Row positive={this.props.isAgree} negative={!this.props.isAgree}>
        <Table.Cell>{this.props.isAgree ? (<Icon color='green' name='checkmark' size='large' />):(<Icon color='red' name='times' size='large' />)}</Table.Cell>
        <Table.Cell>{this.props.point.content}</Table.Cell>
        <Table.Cell collapsing style={{textAlign: 'center'}}>
          {dialog}
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default Agreement;
