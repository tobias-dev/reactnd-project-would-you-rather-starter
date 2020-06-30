import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Box, Button, RadioGroup, Radio } from '@chakra-ui/core';
import { handleAddQuestionAnswer } from '../actions/questions';

class QuestionForm extends Component {
  state = {
    selectedOption: null,
    hasBeenSubmitted: false,
  };

  handleSelectOption = (e) => {
    const selectedOption = e.target.value;
    this.setState(() => ({
      selectedOption,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { question } = this.props;
    const { selectedOption } = this.state;
    const { dispatch } = this.props;

    dispatch(handleAddQuestionAnswer(question, selectedOption));

    this.setState(() => ({
      hasBeenSubmitted: true,
    }));
  };

  render() {
    const { question } = this.props;
    const { selectedOption, hasBeenSubmitted } = this.state;

    if (hasBeenSubmitted === true) {
      return <Redirect to={`/poll/${question.id}`} />;
    }

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
