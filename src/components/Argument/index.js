import React, { Component } from 'react';
import star from '../../star.svg'

import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Box, Columns, Icon, Level, Heading } from 'react-bulma-components';

class Argument extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    let speech;
    if (this.props.argument.from_AvatarID == this.props.avatarOneID) {
      speech = <Columns>
                <Columns.Column size={"two-thirds"}>
                  <Box>
                    <Heading>#{this.props.argument.num}</Heading>
                    <p>{this.props.argument.content}</p>
                    <hr/>
                    <Level>
                      <Level.Side align="left">
                        <img src={star} height="32" width="32"/>
                        <img src={star} height="32" width="32"/>
                        <img src={star} height="32" width="32"/>
                        <img src={star} height="32" width="32"/>
                        <img src={star} height="32" width="32"/>
                      </Level.Side>
                      <Level.Side align="right">
                        <a href="#">Comentarios</a>
                      </Level.Side>
                    </Level>
                  </Box>
                </Columns.Column>
                <Columns.Column>

                </Columns.Column>
               </Columns>
    } else {
      speech = <Columns>
                <Columns.Column>

                </Columns.Column>
                <Columns.Column size={"two-thirds"}>
                  <Box>
                    <Heading>#{this.props.argument.num}</Heading>
                    <p>{this.props.argument.content}</p>
                    <hr/>
                    <Level>
                      <Level.Side align="left">
                        <img src={star} height="32" width="32"/>
                        <img src={star} height="32" width="32"/>
                        <img src={star} height="32" width="32"/>
                        <img src={star} height="32" width="32"/>
                        <img src={star} height="32" width="32"/>
                      </Level.Side>
                      <Level.Side align="right">
                        <a href="#">Comentarios</a>
                      </Level.Side>
                    </Level>
                  </Box>
                </Columns.Column>
               </Columns>
    }

    return (
      <div>
        {speech}
      </div>
    );
  }
}

export default Argument;
