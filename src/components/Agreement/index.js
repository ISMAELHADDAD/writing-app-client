import React, { Component } from 'react';

//UI framework
import { Table, Icon, Card, Button } from 'semantic-ui-react';

class Agreement extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    let dialog;
    if (!this.props.point.isAccepted) {
      dialog = <Card>
                <Card.Content>
                  <Card.Description>
                    <strong>{this.props.point.proposed_by_AvatarName}</strong> a propuesto esto:
                  </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button basic color='green'>
                      Aceptar
                    </Button>
                    <Button basic color='red'>
                      Rechazar
                    </Button>
                  </div>
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
