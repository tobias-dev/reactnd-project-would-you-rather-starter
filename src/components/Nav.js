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
      <Flex className="nav-container">
        <Flex className="menu">
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
          <Flex className="user">
            <Box>
              Hallo, {user.name}{' '}
              <Avatar size="xs" name={user.name} src={user.avatarURL} />
            </Box>
            <PseudoBox className="link">
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
