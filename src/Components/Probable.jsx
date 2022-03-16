import React from 'react'
import {
    Box,
    SimpleGrid,
    Stack
} from '@chakra-ui/react'
import GridItem from './GridItem';
import EmptyRow from './EmptyRow';
import GuessedRow from './GuessedRow';
import CurrentRow from './CurrentRow';
import { useProbable } from '../Context/ProbableProvider';
const ROWS = 6;



export default function Probable() {

    const { guessed, currWord, guessCount, gameOver } = useProbable();
    const [currCol, setCurrCol] = React.useState(0);
    const [currGuess, setCurrGuess] = React.useState("aneem");
    const move = (e) => {
        const key = e.keyCode;
        if (key > 64 && key < 91) {
            console.log("alphabet pressed", key);
            // setCurrLetter(String.fromCharCode(key));
            if (currCol < ROWS - 1) {
                setCurrCol(currCol + 1);
            }
        }
        if (key === 8) {
            console.log("backspace pressed");
        }
        if (key === 13) {
            console.log("enter pressed");
        }
    }
    document.addEventListener("keydown", move);


    return (
        <Box maxWidth='1200px' maxHeight="80vh" px={4} py={4}>
            <Stack direction={'column'} spacing={3} justifyContent='center'>
                <>
                    {
                        Array(guessCount).fill(0).map((_, index) => {
                            return (
                                <GuessedRow key = {index} word={guessed[index]} />
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
                                <EmptyRow key={index}/>
                            )
                        })
                    }
                </>

            </Stack>
        </Box>
    )
}


