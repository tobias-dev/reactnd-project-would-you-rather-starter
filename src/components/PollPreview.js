import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Flex, PseudoBox, Avatar, Divider } from '@chakra-ui/core';
import { FaChevronRight } from 'react-icons/fa';

class PollPreview extends Component {
  render() {
    const { question, author } = this.props;

    return (
      <Flex
        border="solid 1px #ccc"
        rounded="7px"
        marginTop="1em"
        padding="0.5em"
      >
        <Box textAlign="center" width="36%">
          {author.name} asks:
          <Avatar size="lg" name={author.name} src={author.avatarURL} />
        </Box>
        <Divider orientation="vertical" />
        <Box width="60%">
          <Box fontWeight="bold">Would you rather...</Box>
          <Box fontSize="smaller">...{question.optionOne.text}?</Box>
          <Box fontSize="smaller">...{question.optionTwo.text}?</Box>
        </Box>
        <Divider orientation="vertical" />
        <Box
          alignSelf="center"
          width="4%"
          overflow="hidden"
          backgroundColor="#F7FAFC"
        >
          <PseudoBox
            title="View Poll"
            as={FaChevronRight}
            _hover={{ fontSize: '1.2em', cursor: 'pointer' }}
          />
        </Box>
      </Flex>
    );
  }
}

function mapStateToProps({ questions, users }, { id }) {
  return {
    question: questions[id],
    author: users[questions[id].author],
  };
}

export default connect(mapStateToProps)(PollPreview);
