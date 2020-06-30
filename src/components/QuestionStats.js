import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Box,
  Flex,
  Badge,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/core';
import { getQuestionStats } from '../utils/helpers';

class QuestionStats extends Component {
  render() {
    const { stats } = this.props;

    return (
      <Box className="question-stats-container">
        <Box className="bold">Results:</Box>
        <Box>
          {['optionOne', 'optionTwo'].map((option) => {
            const { totalVotes, userAnswer } = stats;
            const { text, votes, percentage } = stats[option];
            const isAnswer = userAnswer === option;
            return (
              <Box
                className={`answer-option ${isAnswer ? 'highlighted' : ''}`}
                key={option}
              >
                {isAnswer && <Badge>Your Choice</Badge>} Would you rather {text}
                ?
                <Flex className="vote-stats">
                  <Box>
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
