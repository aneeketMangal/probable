import {
  Box,
  Flex,
  IconButton,
  useColorModeValue,
  Stack,
  useColorMode,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { MoonIcon, SunIcon, QuestionOutlineIcon, RepeatIcon } from '@chakra-ui/icons';
import { useProbable } from '../Context/ProbableProvider';
const instructions = 'Welcome to the Probable.\n\n\n  The objective of the game is to guess the word correctly in 6 tries.\n\nThe game will end when you guess the word correctly or you run out of guesses.\n\n Following happens when you guess a word:\n1.The letters in the guessed word become orange or green, where orange means that the letter is present in the word but not at correct position & green means the letter is at correct position.\n2. Now in this game there is 4/5 probability that above rule holds for the latest guess and 1/5 probability that the coloring will be random. \n3.The rule of randomization applies only to the latest guess you made.\n\nYou can guess a letter by pressing the corresponding key on the keyboard.\n\nGood luck! :)';



export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {startNewGame} = useProbable();
  const finalRef = React.useRef()
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box bg={useColorModeValue('white')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <Heading>
              Probable
            </Heading>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={2}>
              <IconButton 
              onClick={toggleColorMode} 
              variant = 'ghost' 
              icon={colorMode==='light'?<MoonIcon/>: <SunIcon/>}/>
              <IconButton 
              onClick={onOpen} 
              variant = 'ghost' 
              icon={<QuestionOutlineIcon/>}/>
              <IconButton 
              onClick={startNewGame} 
              variant = 'ghost' 
              icon={<RepeatIcon/>}/>




              
            </Stack>
          </Flex>
        </Flex>

        <Modal  finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Instructions</ModalHeader>
          <ModalCloseButton />
          <ModalBody sx = {{ whiteSpace: 'pre-line'}}>
            {instructions}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </Box>
    </>
  );
}