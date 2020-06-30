import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Box, Avatar, Divider } from '@chakra-ui/core';
import QuestionPreview from './QuestionPreview';
import QuestionForm from './QuestionForm';
import QuestionStats from './QuestionStats';
import InvalidPage from './InvalidPage';

class Question extends Component {
  render() {
    const { author, qid, isPreview, isAnswered } = this.props;

    if (qid === undefined) {
      return <InvalidPage />;
    }

    return (
      <Fragment>
        <Box textAlign="center" width="42%">
          Asked by {author.name}:
          <Avatar
            size="xl"
            name={author.name}
            src={author.avatarURL}
            marginTop="0.2em"
          />
        </Box>
        <Divider orientation="vertical" />
        <Box width="58%">
          {isPreview ? (
            <QuestionPreview qid={qid} />
          ) : isAnswered ? (
            <QuestionStats qid={qid} />
          ) : (
            <QuestionForm qid={qid} />
          )}
        </Box>
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const qid = props.qid !== undefined ? props.qid : props.match.params.qid;
  if (Object.keys(questions).includes(qid)) {
    return {
      qid,
      author: users[questions[qid].author],
      isAnswered: [
        ...questions[qid].optionOne.votes,
        ...questions[qid].optionTwo.votes,
      ].includes(authedUser),
    };
  }
}

export default connect(mapStateToProps)(Question);
