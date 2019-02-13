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
    if (this.props.from == 'one') {
      speech = <Columns>
                <Columns.Column size={"two-thirds"}>
                  <Box>
                    <Heading>#{this.props.num}</Heading>
                    <p>{this.props.argument}</p>
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
                    <Heading>#{this.props.num}</Heading>
                    <p>{this.props.argument}</p>
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
