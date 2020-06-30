import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Box, Select } from '@chakra-ui/core';
import { FaUserCircle } from 'react-icons/fa';
import { setUser } from '../actions/authedUser';

class Login extends Component {
  handleSelectUser = (e) => {
    const selectedUser = e.target.value;
    const { dispatch } = this.props;

    selectedUser.length > 0 && dispatch(setUser(selectedUser));
  };

  render() {
    const { authedUser, users } = this.props;

    if (authedUser !== null) {
      return <Redirect to="/" />;
    }

    return (
      <Box width="100%" rounded="7px">
        <Box
          textAlign="center"
          backgroundColor="#F7FAFC"
          rounded="7px"
          padding="2em 0"
        >
          <Box fontWeight="bold">Welcome to the Would You Rather App!</Box>
          Please sign in to continue
        </Box>
        <Box padding="2em 0 0">
          <Box as={FaUserCircle} margin="0 auto" size="4em" color="#63b3ed" />
        </Box>
        <Box padding="1em 2em 2em">
          Sign in
          <Select value="" onChange={this.handleSelectUser}>
            <option value="" disabled={true}>
              Who are you?
            </option>
            {Object.keys(users).map((uid) => (
              <option key={uid} value={uid}>
                {users[uid].name}
              </option>
            ))}
          </Select>
        </Box>
      </Box>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(Login);
