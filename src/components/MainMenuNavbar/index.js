import React, { Component } from 'react';

//Components
import Login from '../../components/Login';

//Routing
import { NavLink } from 'react-router-dom';

// React Context API
import CurrentSessionContext from "../../CurrentSessionContext";

//UI framework
import { Segment, Menu, Container as ContainerSemantic, Responsive, Icon, Sidebar, Button } from 'semantic-ui-react';

class MainMenuNavbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sidebarVisible: false,
    };
  }

  handleOnClickSidebarVisibility = () => this.setState({sidebarVisible: true})

  handleSidebarHide = () => this.setState({sidebarVisible: false})

  handleGetUserId = (id, token, expiresAt) => this.props.getUserId(id, token, expiresAt)

  render() {
    return (
      <div>
        <Segment inverted style={{marginBottom: '0px', borderRadius: 0}}>
          {/* On desktops and some tablets */}
          <Responsive minWidth={770}>
            <Menu
              inverted
              pointing
              secondary
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
          </Responsive>

          {/* On mobile */}
          <Responsive maxWidth={771}>
            <Menu
              inverted
              pointing
              secondary
              size='large'
            >
              <Menu.Item>
                <Button basic icon inverted onClick={this.handleOnClickSidebarVisibility}><Icon name='bars'/></Button>
              </Menu.Item>
            </Menu>
            <Sidebar
              as={Menu}
              animation='overlay'
              icon='labeled'
              inverted
              onHide={this.handleSidebarHide}
              vertical
              visible={this.state.sidebarVisible}
              width='thin'
            >
              {this.context !== 0 &&
              <Menu.Item as={NavLink} to={'/discussion/'+this.context} onClick={this.handleSidebarHide}><Icon name='pencil' />Espacio<br/> de trabajo</Menu.Item>}
              {this.props.loggedIn &&
              <Menu.Item as={NavLink} to={'/my-discussions'} onClick={this.handleSidebarHide}><Icon name='inbox' />Mis<br/>discusiones</Menu.Item>}
              <Menu.Item as={NavLink} to={'/explore'} onClick={this.handleSidebarHide}><Icon name='globe' /><br/>Explorar</Menu.Item>
              <Menu.Item position='right'>
                <Login getUserId={this.handleGetUserId}/><br/>
              </Menu.Item>
            </Sidebar>
          </Responsive>
        </Segment>
      </div>
    );
  }
}

MainMenuNavbar.contextType = CurrentSessionContext

export default MainMenuNavbar;
