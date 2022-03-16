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
import { ProbableProvider } from './Context/ProbableProvider';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <NavBar></NavBar>

      <Box textAlign="center" fontSize="xl" height="100vh" p={3}>
            <ProbableProvider>
            <Probable/>
            </ProbableProvider>
      </Box>
    </ChakraProvider>
  );
}

export default App;
