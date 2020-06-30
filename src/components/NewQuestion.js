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
    const { optionOne, optionTwo, hasBeenSubmitted } = this.state;

    if (hasBeenSubmitted === true) {
      return <Redirect to="/" />;
    }

    return (
      <Box className="new-question-container">
        <form onSubmit={this.handleSubmit}>
          <Box className="header">Create New Question</Box>
          <Box className="label">Would you rather...</Box>
          <Input
            name="optionOne"
            value={optionOne}
            placeholder="First question"
            onChange={this.handleTextChange}
          />
          <Box className="small">OR</Box>
          <Input
            name="optionTwo"
            value={optionTwo}
            placeholder="Second question"
            onChange={this.handleTextChange}
          />
          <Button type="submit" disabled={optionTwo === '' || optionOne === ''}>
            Submit
          </Button>
        </form>
      </Box>
    );
  }
}

export default connect()(NewQuestion);
