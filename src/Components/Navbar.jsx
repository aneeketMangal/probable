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
import { MarkGithubIcon } from '@primer/octicons-react';



const instructions = 'Welcome to the Probable.\n\n\n  The objective of the game is to guess the word correctly in 6 tries.\n\nThe game will end when you guess the word correctly or you run out of guesses.\nFollowing happens when you guess a word:\n 1.When you guess a word, it becomes green if its at correct position, orange if its present in the word but at wrong position.\n2. There is 1/2 probability that your guess is accepted, otherwise a random word is chosen and coloring is hown according to it. \n3.The rule of randomization applies only to the latest guess you made.\n\nYou can guess a letter by pressing the corresponding key on the virtual keyboard.\n\nGood luck! :)';



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

<IconButton variant='ghost' mr={3} onClick={()=> window.open("https://github.com/aneeketMangal/probable", "_blank")}>
            <MarkGithubIcon size={16} />
              
            </IconButton>


              
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
            <Button colorScheme='blue' mr={3} onClick={()=> window.open("https://github.com/aneeketMangal/probable", "_blank")}>
            <MarkGithubIcon size={16} /> &nbsp;aneeketMangal
              
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </Box>
    </>
  );
}