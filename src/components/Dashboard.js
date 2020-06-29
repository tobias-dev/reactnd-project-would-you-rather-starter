import React, { Component } from 'react';
import { connect } from 'react-redux';
import PollPreview from './PollPreview';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/core';

class Dashboard extends Component {
  render() {
    const { answeredQuestionIds, unansweredQuestionIds } = this.props;

    return (
      <Tabs
        isFitted={true}
        variant="soft-rounded"
        width="50%"
        margin="0 auto"
        border="solid 1px #ccc"
        padding="1em"
        rounded="7px"
      >
        <TabList>
          <Tab>Unanswered Questions</Tab>
          <Tab>Answered Questions</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ul>
              {unansweredQuestionIds.length > 0
                ? unansweredQuestionIds.map((id) => (
                    <PollPreview key={id} id={id} />
                  ))
                : 'You have answered all current questions.'}
            </ul>
          </TabPanel>
          <TabPanel>
            <ul>
              {answeredQuestionIds.length > 0
                ? answeredQuestionIds.map((id) => (
                    <PollPreview key={id} id={id} />
                  ))
                : "You don't have any questions answered yet."}
            </ul>
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  const unansweredQuestionIds = [];
  const answeredQuestionIds = [];
  Object.keys(questions)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    .forEach((id) => {
      Object.keys(users[authedUser].answers).includes(id)
        ? answeredQuestionIds.push(id)
        : unansweredQuestionIds.push(id);
    });
  return {
    answeredQuestionIds,
    unansweredQuestionIds,
  };
}

export default connect(mapStateToProps)(Dashboard);
