import React, { Component } from 'react';
import { connect } from 'react-redux';

class PollPreview extends Component {
  render() {
    return (
      <div>
        Preview: {this.props.question.id}
        <br />
        Author: {this.props.question.author}
      </div>
    );
  }
}

function mapStateToProps({ questions }, { id }) {
  return {
    question: questions[id],
  };
}

export default connect(mapStateToProps)(PollPreview);
