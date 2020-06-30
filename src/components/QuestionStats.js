import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Flex,
  Badge,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/core';

class QuestionStats extends Component {
  render() {
    const { question, authedUser } = this.props;
    const optionOneCount = question.optionOne.votes.length;
    const optionTwoCount = question.optionTwo.votes.length;
    const allCount = optionOneCount + optionTwoCount;
    const optionCount = {
      optionOne: optionOneCount,
      optionTwo: optionTwoCount,
    };
    const optionPercentage = {
      optionOne: (optionOneCount * 100) / allCount,
      optionTwo: (optionTwoCount * 100) / allCount,
    };

    return (
      <Box>
        <Box fontWeight="bold">Results:</Box>
        <Box padding-top="1em">
          {['optionOne', 'optionTwo'].map((option) => (
            <Box
              key={option}
              marginTop="0.5em"
              padding="0.5em"
              border="solid 1px #ccc"
              rounded="7px"
              backgroundColor={
                question[option].votes.includes(authedUser) ? '#F7FAFC' : ''
              }
            >
              {question[option].votes.includes(authedUser) && (
                <Badge>Your Choice</Badge>
              )}{' '}
              Would you rather {question[option].text}?
              <Flex
                fontWeight="bold"
                alignItems="center"
                justifyContent="center"
                marginTop="0.5em"
              >
                <Box paddingRight="1em">{`${optionCount[option]} of ${allCount} votes`}</Box>
                <Box>
                  <CircularProgress value={optionPercentage[option]}>
                    <CircularProgressLabel>{`${parseInt(
                      optionPercentage[option]
                    )}%`}</CircularProgressLabel>
                  </CircularProgress>
                </Box>
              </Flex>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }
}

function mapStateToProps({ authedUser, questions }, { qid }) {
  return {
    authedUser,
    question: questions[qid],
  };
}

export default connect(mapStateToProps)(QuestionStats);
