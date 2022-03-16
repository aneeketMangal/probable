import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Probable from './Components/Probable';
import NavBar from './Components/Navbar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <NavBar></NavBar>
      <Box textAlign="center" fontSize="xl">
        <Grid height="100vh" p={3}>
          {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
          <VStack spacing={8} justifyContent='space-between'>
            <Probable></Probable>
            <div></div>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
