import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Flex,
  Badge,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/core';
import { getQuestionStats } from '../utils/helper';

class QuestionStats extends Component {
  render() {
    const { stats } = this.props;

    return (
      <Box>
        <Box fontWeight="bold">Results:</Box>
        <Box padding-top="1em">
          {['optionOne', 'optionTwo'].map((option) => {
            const { totalVotes, userAnswer } = stats;
            const { text, votes, percentage } = stats[option];
            const isAnswer = userAnswer === option;
            return (
              <Box
                key={option}
                marginTop="0.5em"
                padding="0.5em"
                border="solid 1px #ccc"
                rounded="7px"
                backgroundColor={isAnswer ? '#F7FAFC' : ''}
              >
                {isAnswer && <Badge>Your Choice</Badge>}
                Would you rather {text}?
                <Flex
                  fontWeight="bold"
                  alignItems="center"
                  justifyContent="center"
                  marginTop="0.5em"
                >
                  <Box paddingRight="1em">
                    {votes} of {totalVotes} votes
                  </Box>
                  <Box>
                    <CircularProgress value={percentage}>
                      <CircularProgressLabel>{`${percentage}%`}</CircularProgressLabel>
                    </CircularProgress>
                  </Box>
                </Flex>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }
}

function mapStateToProps({ authedUser, questions }, { qid }) {
  return {
    stats: getQuestionStats(questions[qid], authedUser),
  };
}

export default connect(mapStateToProps)(QuestionStats);
