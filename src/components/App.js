import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import { Box, CSSReset, ThemeProvider } from '@chakra-ui/core';
import Dashboard from './Dashboard';
import Login from './Login';
import Nav from './Nav';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    const { authedUser } = this.props;

    return (
      <ThemeProvider>
        <CSSReset />
        <Box maxWidth="1000px" margin="0 auto">
          <CSSReset />
          <Nav />
          {authedUser === null ? <Login /> : <Dashboard />}
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
