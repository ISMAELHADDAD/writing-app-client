import React, { Component } from 'react';

import wallpaper from '../../authorize-wallpaper-1.jpg';

//UI framework
import { Modal, Icon, Button, Header } from 'semantic-ui-react';

class AuthorizePage extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div style={{backgroundImage: "url(" + wallpaper + ")", minHeight: '100vh'}}>
        <Modal dimmer={'blurring'} open={true} basic>
          <Header style={{textAlign: 'center'}}>Autorizando a Ideashub para acceder a Google</Header>
          <Modal.Content style={{textAlign: 'center'}}>
            <p>
              Para acceder a la discussion es necesario autorizarlo mediante una cuenta de Google.
            </p>
          </Modal.Content>
          <Modal.Actions style={{textAlign: 'center'}}>
            <Button color='green' inverted size='massive'>
              <Icon name='lock' /> Autorizar con Google
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default AuthorizePage;
