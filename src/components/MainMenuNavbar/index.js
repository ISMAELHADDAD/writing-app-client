import React, { Component } from 'react';

//Components
import Login from '../../components/Login';

//Routing
import { NavLink } from 'react-router-dom';

// React Context API
import CurrentSessionContext from "../../CurrentSessionContext";

//UI framework
import { Segment, Menu, Container as ContainerSemantic } from 'semantic-ui-react';

class MainMenuNavbar extends Component {

  handleGetUserId = (id, token, expiresAt) => this.props.getUserId(id, token, expiresAt)

  render() {
    return (
      <div>
        <Segment inverted style={{marginBottom: '0px'}}>
          <Menu
              inverted
              pointing
              secondary
              stackable
              size='large'
            >
              <ContainerSemantic>
                {this.context !== 0 &&
                <Menu.Item as={NavLink} to={'/discussion/'+this.context} content='Espacio de trabajo'/>}
                {this.props.loggedIn &&
                <Menu.Item as={NavLink} to={'/my-discussions'} content='Mis discusiones'/>}
                <Menu.Item as={NavLink} to={'/explore'} content='Explorar'/>
                <Menu.Item position='right'>
                  <Login getUserId={this.handleGetUserId}/>
                </Menu.Item>
              </ContainerSemantic>
            </Menu>
        </Segment>
      </div>
    );
  }
}

MainMenuNavbar.contextType = CurrentSessionContext

export default MainMenuNavbar;
