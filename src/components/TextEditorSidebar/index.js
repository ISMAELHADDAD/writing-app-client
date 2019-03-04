import React, { Component } from 'react';

//UI framework
import { Container, Row, Col } from 'react-grid-system';
import { Sidebar, Segment, Form, TextArea, Button, Icon, Card, Dropdown } from 'semantic-ui-react'

class TextEditorSidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      avatarSelect: [],
      who: null,
      textContent: '',
      validContent: true,
      words: 0,
      validAvatar: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.avatarOne && this.props.avatarTwo)
    this.setState({
      avatarSelect: [
        {
          text: this.props.avatarOne.name,
          value: this.props.avatarOne.id,
          image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/large/matthew.png' },
        },
        {
          text: this.props.avatarTwo.name,
          value: this.props.avatarTwo.id,
          image: { avatar: true, src: 'https://react.semantic-ui.com/images/avatar/large/matthew.png' },
        }
      ]
    });
  }

  handleChangeSelect = (event, data) => {
    this.setState({ who: data.value, validAvatar: false });
  };

  handleChangeText = (event, data) => {
    var words = 0
    if (data.value.match(/\S+/g) != null)
      words = data.value.match(/\S+/g).length;
    if (words > 100 || words < 1) {
      this.setState({ textContent: data.value, validContent: true, words: words });
    } else {
      this.setState({ textContent: data.value, validContent: false, words: words });
    }
  };

  handleClick = () => {
    this.props.passClick(this.state.who, this.state.textContent);
  };

  render() {
    return (
      <Sidebar as={Segment} animation={'push'} direction={'bottom'} visible={this.props.visible}>
        <Container>
          <Card fluid>
            <Card.Content>
              <Dropdown placeholder='Selecciona el avatar' selection options={this.state.avatarSelect} onChange={this.handleChangeSelect}/>
            </Card.Content>
            <Card.Content>
              <Form>
                <TextArea placeholder='Escribe aqui tu argumento...' style={{ minHeight: 100, maxHeight: 200 }} onChange={this.handleChangeText}/>
              </Form>
            </Card.Content>
            <Card.Content extra>
              <Row>
                <Col>
                  <h2 style={{ color: this.state.validContent? 'red':null }}>{this.state.words} / 100</h2>
                </Col>
                <Col>
                  <Button disabled={this.state.validContent || this.state.validAvatar} floated='right' icon labelPosition='left' primary size='small' onClick={this.handleClick}>
                    <Icon name='send' /> Enviar
                  </Button>
                </Col>
              </Row>
            </Card.Content>
          </Card>
        </Container>
      </Sidebar>
    );
  }
}

export default TextEditorSidebar;