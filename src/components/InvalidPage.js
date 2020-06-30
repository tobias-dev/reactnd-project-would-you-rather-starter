import React from 'react';
import { Box, Icon } from '@chakra-ui/core';

const InvalidPage = () => (
  <Box textAlign="center" width="100%">
    <Icon name="warning" size="3em" />
    <br />
    Page not found.
  </Box>
);

export default InvalidPage;
