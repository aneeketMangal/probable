import React from 'react'
import {
    Box,
    Stack,
    useToast
} from '@chakra-ui/react'
import EmptyRow from './EmptyRow';
import GuessedRow from './GuessedRow';
import CurrentRow from './CurrentRow';
import { useProbable } from '../Context/ProbableProvider';


import "react-simple-keyboard/build/css/index.css";
import KeyBoard from './KeyBoard';
const ROWS = 6;
const COLUMNS = 5;



export default function Probable() {

    const toast = useToast();
    const {checkGuess, guessCount, gameOver, guessed} = useProbable();
    const [currGuess, setCurrGuess] = React.useState("");
    const move = (key) => {
        
        if (key >= 'A' && key <= 'Z') {
            const currPressedLetter = key.toLowerCase();
            if(currGuess.length < COLUMNS) {
                setCurrGuess(currGuess + currPressedLetter);
            }

        }
        if (key === "back") {
            setCurrGuess(currGuess.slice(0, currGuess.length - 1));
        }
        if (key === "enter") {
            if(currGuess.length === COLUMNS) {
                const check = checkGuess(currGuess);
                if(check === 1){
                    toast({
                        title: "Gajab",
                        description: "You guessed the word",
                        status: "success",
                        duration: 2000,
                    })
                }
                else if (check === 0){
                    toast({
                        title: "Vapis se khel yar",
                        description: "Try again",
                        status: "error",
                        duration: 2000,
                    })
                }
                else if(check === -1){
                    toast({
                        title: "Nahi yaar",
                        description: "No such word in our dictionary",
                        status: "error",
                        duration: 2000,
                    })
                }
                
                setCurrGuess("");
            }
            else{
                toast({
                    title: "Bhai kya kar raha hai yar!!",
                    description: "Not enough letters",
                    status: "error",
                    duration: 1000,
                })
            }
        }
    }




    return (
        <>
            <Box maxWidth='1200px' maxHeight="80vh" px={4} py={4}>
                <Stack direction={'column'} spacing={3} justifyContent='center'>
                    <>
                        {
                            guessed.map((val, index) => {
                                return (
                                    <GuessedRow key={index} word= {val} />
                                )
                            })

                        }
                        {
                            gameOver ?
                                <></> : <CurrentRow word={currGuess} />

                        }
                        {
                            Array(ROWS - guessCount - !gameOver).fill(0).map((_, index) => {
                                return (
                                    <EmptyRow key={index} />
                                )
                            })
                        }
                        
                    </>

        <KeyBoard onClick = {move}></KeyBoard>
                </Stack>
            </Box>
        </>
    )
}


