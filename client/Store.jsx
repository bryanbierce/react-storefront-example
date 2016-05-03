import React from 'react';

class Store extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: ''
    };
  }

  render() {
    return (
      <div id="storeFront">
        <pre>
          { this.state.response }
        </pre>
      </div>
    );
  }
}

module.exports = Store;
