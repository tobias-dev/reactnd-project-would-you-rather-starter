import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Select } from '@chakra-ui/core';
import { FaUserCircle } from 'react-icons/fa';
import { setUser } from '../actions/authedUser';

class Login extends Component {
  handleSelectUser = (e) => {
    const selectedUser = e.target.value;
    const { dispatch } = this.props;

    if (selectedUser.length > 0) {
      dispatch(setUser(selectedUser));
    }
  };

  render() {
    const { users } = this.props;

    return (
      <Box width="50%" margin="0 auto" border="solid 1px #ccc" rounded="7px">
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
          <Box as={FaUserCircle} margin="0 auto" size="4em" color="#4682b4" />
        </Box>
        <Box padding="1em 2em 2em">
          Sign in
          <Select
            placeholder="Who are you?"
            ref={(selectedUser) => (this.selectedUser = selectedUser)}
            onChange={this.handleSelectUser}
          >
            {Object.keys(users).map((userId) => (
              <option key={userId} value={userId}>
                {users[userId].name}
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
