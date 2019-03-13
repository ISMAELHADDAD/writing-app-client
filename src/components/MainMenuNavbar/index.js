import React, { Component } from 'react';

//Components
import Login from '../../components/Login';

//Routing
import { Link } from 'react-router-dom';

//UI framework
import { Segment, Menu, Container as ContainerSemantic, Popup, Icon } from 'semantic-ui-react';

class MainMenuNavbar extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  handleGetUserId = (id, token, expires_at) => this.props.getUserId(id, token, expires_at)

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
                <Menu.Item link active>
                  <Link to="/discussion/1">Espacio de trabajo</Link>
                </Menu.Item>
                <Popup trigger={<Menu.Item link>Mis discusiones</Menu.Item>} position='bottom center'>
                  <Icon name='ban'/> No disponible
                </Popup>
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

export default MainMenuNavbar;
