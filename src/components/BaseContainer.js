import React, { Component } from 'react';

class BaseContainer extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default BaseContainer;
