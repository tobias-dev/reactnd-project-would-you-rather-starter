import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/core';

class Dashboard extends Component {
  render() {
    return (
      <Tabs isFitted={true} variant="soft-rounded" className="tab-list">
        <TabList>
          <Tab>Unanswered Questions</Tab>
          <Tab>Answered Questions</Tab>
        </TabList>
        <TabPanels>
          {['unansweredIds', 'answeredIds'].map((key) => (
            <TabPanel key={key} className="tab-panel">
              {this.props[key].length > 0
                ? this.props[key].map((qid) => (
                    <Question key={qid} qid={qid} isPreview={true} />
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
