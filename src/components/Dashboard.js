import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Flex } from '@chakra-ui/core';

class Dashboard extends Component {
  render() {
    return (
      <Tabs isFitted={true} width="100%" variant="soft-rounded">
        <TabList>
          <Tab>Unanswered Questions</Tab>
          <Tab>Answered Questions</Tab>
        </TabList>
        <TabPanels>
          {['unansweredIds', 'answeredIds'].map((key) => (
            <TabPanel key={key} marginTop="0.5em">
              {this.props[key].length > 0
                ? this.props[key].map((qid) => (
                    <Flex
                      key={qid}
                      border="solid 1px #ccc"
                      rounded="7px"
                      padding="0.5em"
                      marginTop="0.5em"
                    >
                      <Question key={qid} qid={qid} isPreview={true} />
                    </Flex>
                  ))
                : 'There is currently no question left.'}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    );
  }
}

function mapStateToProps({ authedUser, questions }) {
  const answeredIds = [];
  const unansweredIds = [];
  Object.keys(questions)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    .forEach((qid) => {
      [
        ...questions[qid].optionOne.votes,
        ...questions[qid].optionTwo.votes,
      ].includes(authedUser)
        ? answeredIds.push(qid)
        : unansweredIds.push(qid);
    });
  return {
    answeredIds,
    unansweredIds,
  };
}

export default connect(mapStateToProps)(Dashboard);
