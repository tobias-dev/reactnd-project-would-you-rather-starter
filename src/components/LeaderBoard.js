import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Flex, Avatar, Divider, Badge } from '@chakra-ui/core';
import { getUserStats } from '../utils/helpers';

class LeaderBoard extends Component {
  render() {
    const { stats } = this.props;

    return (
      <Box width="100%" marginTop="-0.5em">
        {stats.map((userStats) => {
          const { id, name, avatarURL, created, answered, score } = userStats;
          return (
            <Flex
              key={id}
              width="100%"
              border="solid 1px #ccc"
              marginTop="0.5em"
              padding="0.5em"
              rounded="7px"
              alignItems="center"
            >
              <Box textAlign="center" width="35%">
                {name}
                <Avatar
                  size="xl"
                  name={name}
                  src={avatarURL}
                  marginTop="0.2em"
                />
              </Box>
              <Divider orientation="vertical" />
              <Box textAlign="center" width="65%">
                <Badge
                  variant="subtle"
                  variantColor="green"
                  fontSize="1.5em"
                  margin="0.5em"
                >
                  Score: {score}
                </Badge>
                <Box>
                  Answered Questions: {answered}
                  <br />
                  Created Questions: {created}
                </Box>
              </Box>
            </Flex>
          );
        })}
      </Box>
    );
  }
}

function mapStateToProps({ users, questions }) {
  const stats = Object.keys(users)
    .map((uid) => getUserStats(users[uid], questions))
    .sort((a, b) => b.score - a.score);

  return {
    stats,
  };
}

export default connect(mapStateToProps)(LeaderBoard);
