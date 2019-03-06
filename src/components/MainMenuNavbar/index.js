import React, { Component } from 'react';

//Components
import Login from '../../components/Login';

//UI framework
import { Segment, Menu, Container as ContainerSemantic } from 'semantic-ui-react';

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
              size='large'
            >
              <ContainerSemantic>
                <Menu.Item as='a' active>
                  Espacio de trabajo
                </Menu.Item>
                <Menu.Item as='a'>Mis discusiónes</Menu.Item>
                <Menu.Item as='a'>Explorar</Menu.Item>
                <Menu.Item as='a'>Ajustes</Menu.Item>
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
