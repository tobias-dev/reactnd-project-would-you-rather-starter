import React, { Component } from 'react';
import { connect } from 'react-redux';
import PollPreview from './PollPreview';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h3>Answered Questions</h3>
        <ul>
          {this.props.answeredQuestionIds.map((id) => (
            <PollPreview key={id} id={id} />
          ))}
        </ul>
        <h3>Unanswered Questions</h3>
        <ul>
          {this.props.unansweredQuestionIds.map((id) => (
            <PollPreview key={id} id={id} />
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  const answeredQuestionIds = [];
  const unansweredQuestionIds = [];
  if (authedUser !== null) {
    const questionIds = Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    );
    questionIds.forEach((id) => {
      const hasAnswered = Object.keys(users[authedUser].answers).includes(id);
      hasAnswered
        ? answeredQuestionIds.push(id)
        : unansweredQuestionIds.push(id);
    });
  }
  return {
    answeredQuestionIds,
    unansweredQuestionIds,
  };
}

export default connect(mapStateToProps)(Dashboard);
