import React from 'react';
import {
  ChakraProvider,
  Center,
  extendTheme
} from '@chakra-ui/react';

import Probable from './Components/Probable';
import NavBar from './Components/Navbar';
import { ProbableProvider } from './Context/ProbableProvider';
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({ config })
function App() {
  return (
    <ChakraProvider theme={theme}>
        <ProbableProvider>
      <NavBar/>

      <Center height="80vh" p={3}>
          <Probable/>
      </Center>
        </ProbableProvider>
    </ChakraProvider>
  );
}

export default App;
