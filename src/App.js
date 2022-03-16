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
  Center
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

      <Center height="80vh" p={3}>
        <ProbableProvider>
          <Probable/>
        </ProbableProvider>
      </Center>
    </ChakraProvider>
  );
}

export default App;
