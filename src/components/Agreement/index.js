import React, { Component } from 'react';

import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Box, Button } from 'react-bulma-components';

class Agreement extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    let dialog;
    if (!this.props.point.accepted) {
      dialog = <Box>
                <p>{this.props.point.proposedFrom} a propuesto esto:</p>
                <Button color='success'>Aceptar</Button>
                <Button color='danger'>Rechazar</Button>
               </Box>
    } else {
      dialog = <Button disabled={true}>Aceptado</Button>
    }

    return (
      <tr style={this.props.isAgree ? {backgroundColor: '#96C0B7'} : {backgroundColor: '#ec9191'}}>
        <td>{this.props.isAgree ? 'Acuerdo':'Desacuerdo'}</td>
        <td>{this.props.point.content}</td>
        <td style={{textAlign: 'center'}}>
          {dialog}
        </td>
      </tr>
    );
  }
}

export default Agreement;
