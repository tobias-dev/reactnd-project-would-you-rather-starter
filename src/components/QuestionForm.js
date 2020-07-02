import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Box, Button, RadioGroup, Radio } from '@chakra-ui/core';
import { handleAddQuestionAnswer } from '../actions/questions';

class QuestionForm extends Component {
  state = {
    selectedOption: null,
  };

  handleSelectOption = (e) => {
    const selectedOption = e.target.value;
    this.setState(() => ({
      selectedOption,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { question, dispatch } = this.props;
    const { selectedOption } = this.state;

    dispatch(handleAddQuestionAnswer(question, selectedOption));
  };

  render() {
    const { question } = this.props;
    const { selectedOption } = this.state;

    return (
      <Fragment>
        <Box fontWeight="bold">Would you rather...</Box>
        <form onSubmit={this.handleSubmit}>
          <RadioGroup className="options" onChange={this.handleSelectOption}>
            {['optionOne', 'optionTwo'].map((option) => (
              <Radio key={option} value={option}>
                ...{question[option].text}?
              </Radio>
            ))}
          </RadioGroup>
          <Button type="submit" disabled={selectedOption === null}>
            Submit
          </Button>
        </form>
      </Fragment>
    );
  }
}

function mapStateToProps({ questions }, { qid }) {
  return {
    question: questions[qid],
  };
}

export default connect(mapStateToProps)(QuestionForm);
