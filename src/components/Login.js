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
      <Box className="login-container">
        <Box className="header">
          <Box>Welcome to the Would You Rather App!</Box>
          Please sign in to continue
        </Box>
        <Box className="icon" as={FaUserCircle} />
        <Box className="select-container">
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
