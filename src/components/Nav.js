import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import { FaSignOutAlt } from 'react-icons/fa';

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
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="#">New Question</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="#">Leader Board</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
        {user && (
          <Flex flex="50%" textAlign="right">
            <Box width="80%">
              Hallo, {user.name}{' '}
              <Avatar size="xs" name={user.name} src={user.avatarURL} />
            </Box>
            <PseudoBox
              width="20%"
              _hover={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              <span onClick={this.handleLogout}>
                Logout <Box as={FaSignOutAlt} display="inline-block" />
              </span>
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
