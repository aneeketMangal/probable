import React from 'react'
import {
    Box,
    SimpleGrid,
    Stack,
    Button
} from '@chakra-ui/react'
import GridItem from './GridItem';
import EmptyRow from './EmptyRow';
import GuessedRow from './GuessedRow';
import CurrentRow from './CurrentRow';
import { useProbable } from '../Context/ProbableProvider';


import "react-simple-keyboard/build/css/index.css";
import Keyboard from "react-simple-keyboard";
import KeyBoard from './KeyBoard';
const ROWS = 6;
const COLUMNS = 5;



export default function Probable() {

    const { guessed, checkGuess, guessCount, gameOver} = useProbable();
    const [currGuess, setCurrGuess] = React.useState("");
    const [temp, setTemp] = React.useState(0);
    const move = (key) => {
        
        if (key >= 'A' && key <= 'Z') {
            const currPressedLetter = key.toLowerCase();
            if(currGuess.length < COLUMNS) {
                setCurrGuess(currGuess + currPressedLetter);
            }
            console.log("alphabet pressed", key);

        }
        if (key === "back") {
            console.log("backspace pressed");
            setCurrGuess(currGuess.slice(0, currGuess.length - 1));
        }
        if (key === "enter") {
            console.log("enter pressed");
            if(currGuess.length === COLUMNS) {
                const check = checkGuess(currGuess);
                setCurrGuess("");
                setTemp(temp + 1);
            }
            else{
                alert("Please enter a word of length 5");
            }
            }
    }




    return (
        <>
            <Box maxWidth='1200px' maxHeight="80vh" px={4} py={4}>
                <Stack direction={'column'} spacing={3} justifyContent='center'>
                    <>
                        {
                            Array(guessCount).fill(0).map((_, index) => {
                                return (
                                    <GuessedRow key={index} word={guessed[index]} />
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
                        {

                            // <Keyboard style = {{color: 'black', backgroundColor: 'black'}} onKeyPress={move} />
                        }
                        {
                        }
                    </>

        <KeyBoard btest = {temp} onClick = {move}></KeyBoard>
                </Stack>
            </Box>
        </>
    )
}


