import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { handleInitialData } from '../actions/shared';
import { Box, CSSReset, ThemeProvider, Flex } from '@chakra-ui/core';
import LoadingBar from 'react-redux-loading';
import Dashboard from './Dashboard';
import Login from './Login';
import Question from './Question';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import Nav from './Nav';
import InvalidPage from './InvalidPage';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <ThemeProvider>
        <CSSReset />
        <Box maxWidth="1000px" margin="0 auto">
          <CSSReset />
          <LoadingBar />
          <Nav />
          <Flex
            width="50%"
            margin="0 auto"
            border="solid 1px #ccc"
            rounded="7px"
            marginTop="1em"
            padding="0.5em"
          >
            {this.props.authedUser === null ? (
              <Route path="/" component={Login} />
            ) : (
              <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/questions/:qid" exact component={Question} />
                <Route path="/add" exact component={NewQuestion} />
                <Route path="/leaderboard" exact component={LeaderBoard} />
                <Route component={InvalidPage} />
              </Switch>
            )}
          </Flex>
        </Box>
      </ThemeProvider>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(App);
