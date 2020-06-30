import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Box, Button } from '@chakra-ui/core';

class QuestionPreview extends Component {
  render() {
    const { question } = this.props;

    return (
      <Fragment>
        <Box fontWeight="bold">Would you rather...</Box>
        <Box margin="1em 0">
          {['optionOne', 'optionTwo'].map((option) => (
            <Box key={option}>...{question[option].text}?</Box>
          ))}
        </Box>
        <NavLink to={`/questions/${question.id}`}>
          <Button>View Poll</Button>
        </NavLink>
      </Fragment>
    );
  }
}

function mapStateToProps({ questions }, { qid }) {
  return {
    question: questions[qid],
  };
}

export default connect(mapStateToProps)(QuestionPreview);
