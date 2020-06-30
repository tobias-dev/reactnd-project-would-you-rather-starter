import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Flex,
  Box,
  PseudoBox,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Avatar,
} from '@chakra-ui/core';
import { unsetUser } from '../actions/authedUser';

class Nav extends Component {
  handleLogout = (e) => {
    e.preventDefault();
    this.props.dispatch(unsetUser());
  };

  render() {
    const { user } = this.props;

    return (
      <Flex
        padding="1em 0 0.5em"
        marginBottom="2em"
        color="dimgrey"
        borderBottom="solid 1px #E2E8F0"
      >
        <Flex flex="50%">
          <Breadcrumb separator="" padding="0">
            <BreadcrumbItem>
              <BreadcrumbLink as={NavLink} to="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink as={NavLink} to="/add">
                New Question
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink as={NavLink} to="/leaderboard">
                Leader Board
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
        {user && (
          <Flex flex="50%" textAlign="right">
            <Box width="85%">
              Hallo, {user.name}{' '}
              <Avatar size="xs" name={user.name} src={user.avatarURL} />
            </Box>
            <PseudoBox
              width="15%"
              _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              <span onClick={this.handleLogout}>Logout</span>
            </PseudoBox>
          </Flex>
        )}
      </Flex>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    user: authedUser !== null ? users[authedUser] : null,
  };
}

export default connect(mapStateToProps)(Nav);
