import React from 'react';
import { Box, Icon } from '@chakra-ui/core';

const InvalidPage = () => (
  <Box className="invalid-container">
    <Icon name="warning" />
    <br />
    Page not found.
  </Box>
);

export default InvalidPage;
