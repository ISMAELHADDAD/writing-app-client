import React, { Component } from 'react';

import wallpaper from '../../authorize-wallpaper-1.jpg';

//Routing
import { Link } from 'react-router-dom';

//UI framework
import { Modal, Message } from 'semantic-ui-react';

class ErrorPage extends Component {

  render() {
    return (
      <div style={{backgroundImage: "url(" + wallpaper + ")", minHeight: '100vh'}}>
        <Modal dimmer={'blurring'} open={true} basic>
          <Message negative>
            <Message.Header>Error</Message.Header>
            <p>An error has ocurred. Please, go to the <Link to='/'>Main page</Link></p>
          </Message>
        </Modal>
      </div>
    );
  }
}

export default ErrorPage;
