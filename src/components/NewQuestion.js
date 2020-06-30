import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Box, Input, Button } from '@chakra-ui/core';
import { handleAddQuestion } from '../actions/questions';

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    hasBeenSubmitted: false,
  };

  handleTextChange = (e) => {
    const text = e.target.value;
    const field = e.target.name;

    this.setState(() => ({
      [field]: text,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { optionOne, optionTwo } = this.state;
    const { dispatch } = this.props;

    dispatch(handleAddQuestion(optionOne, optionTwo));

    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
      hasBeenSubmitted: true,
    }));
  };

  render() {
    const { authedUser } = this.props;
    const { optionOne, optionTwo, hasBeenSubmitted } = this.state;

    if (hasBeenSubmitted === true) {
      return <Redirect to="/" />;
    }

    return (
      <Box width="100%">
        <form onSubmit={this.handleSubmit}>
          <Box fontWeight="bold" fontSize="1.5em" textAlign="center">
            Create New Question
          </Box>
          <Box fontWeight="bold" margin="1em 0">
            Would you rather...
          </Box>
          <Input
            name="optionOne"
            value={optionOne}
            placeholder="First question"
            onChange={this.handleTextChange}
          />
          <Box fontWeight="bold" fontSize="0.75em" textAlign="center">
            OR
          </Box>
          <Input
            name="optionTwo"
            value={optionTwo}
            placeholder="Second question"
            onChange={this.handleTextChange}
          />
          <Box
            fontWeight="bold"
            fontSize="0.75em"
            textAlign="center"
            margin="1em 0 0"
          >
            <Button
              type="submit"
              disabled={optionTwo === '' || optionOne === ''}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(NewQuestion);
