import React, { Component } from 'react';

//Components
import Login from '../../components/Login';

//Routing
import { NavLink, withRouter } from 'react-router-dom';

// React Context API
import CurrentSessionContext from "../../CurrentSessionContext";

//UI framework
import { Segment, Menu, Container as ContainerSemantic, Popup, Icon } from 'semantic-ui-react';

class MainMenuNavbar extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

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
                <Menu.Item as={NavLink} to={'/discussion/'+this.context} content='Espacio de trabajo'/>
                <Menu.Item as={NavLink} to={'/my-discussions'} content='Mis discusiones'/>
                <Popup trigger={<Menu.Item link>Explorar</Menu.Item>} position='bottom center'>
                  <Icon name='ban'/> No disponible
                </Popup>
                <Popup trigger={<Menu.Item link>Ajustes</Menu.Item>} position='bottom center'>
                  <Icon name='ban'/> No disponible
                </Popup>
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

export default withRouter(MainMenuNavbar);
