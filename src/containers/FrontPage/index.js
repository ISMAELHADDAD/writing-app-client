import React, { Component } from 'react';

//UI framework
import { Button, Icon, Segment, Header, Container as ContainerSemantic } from 'semantic-ui-react';

class FrontPage extends Component {

  render() {
    return (
      <div>
        <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <ContainerSemantic text>
              <Header
                as='h1'
                content='Ideashub'
                inverted
                style={{
                  fontSize: '4em',
                  fontWeight: 'normal',
                  marginBottom: 0,
                  marginTop: '3em',
                }}
              />
              <Header
                as='h2'
                content='Aplicación para discusiones.'
                inverted
                style={{
                  fontSize: '1.7em',
                  fontWeight: 'normal',
                  marginTop: '1.5em',
                }}
              />
              <Button primary size='huge' onClick={() => this.props.history.push('/explore')}>
                Explorar
                <Icon name='right arrow' />
              </Button>
            </ContainerSemantic>
          </Segment>
      </div>
    );
  }
}

export default FrontPage;
