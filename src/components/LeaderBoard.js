import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Flex, Avatar, Divider, Badge } from '@chakra-ui/core';
import { getUserStats } from '../utils/helpers';

class LeaderBoard extends Component {
  render() {
    const { stats } = this.props;

    return (
      <Box className="leaderboard-container">
        {stats.map((userStats) => {
          const { id, name, avatarURL, created, answered, score } = userStats;
          return (
            <Flex key={id} className="user-stats-container">
              <Box>
                {name}
                <Avatar
                  className="avatar"
                  size="xl"
                  name={name}
                  src={avatarURL}
                />
              </Box>
              <Divider orientation="vertical" />
              <Box>
                <Badge className="badge" variant="subtle" variantColor="green">
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
