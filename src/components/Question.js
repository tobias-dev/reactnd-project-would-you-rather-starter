import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Flex, Avatar, Divider } from '@chakra-ui/core';
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
      <Flex className="question-container">
        <Box>
          Asked by {author.name}:
          <Avatar
            className="avatar"
            size="xl"
            name={author.name}
            src={author.avatarURL}
          />
        </Box>
        <Divider orientation="vertical" />
        <Box>
          {isPreview ? (
            <QuestionPreview qid={qid} />
          ) : isAnswered ? (
            <QuestionStats qid={qid} />
          ) : (
            <QuestionForm qid={qid} />
          )}
        </Box>
      </Flex>
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
  return {};
}

export default connect(mapStateToProps)(Question);
