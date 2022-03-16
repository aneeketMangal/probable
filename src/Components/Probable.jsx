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
const ROWS = 6;




export default function Probable() {

    const [currCol, setCurrCol] = React.useState(0);
    const move = (e) => {
        const key = e.keyCode;
        if (key > 64 && key < 91) {
            console.log("alphabet pressed", key);
            setCurrLetter(String.fromCharCode(key));
        }
        if(key === 8){
            console.log("backspace pressed");
        }
        if(key === 13){
            console.log("enter pressed");
        }
    }
    document.addEventListener("keydown", move);
    const [currRow, setCurrRow] = React.useState(0);
    const [guessed, setGuessed] = React.useState(0);
    const [currLetter, setCurrLetter] = React.useState('A');
    const [complete, setComplete] = React.useState(false);


    return (
        <Box maxWidth='1200px' maxHeight="80vh" px={4} py={4}>
            <Stack direction={'column'} spacing={3} justifyContent='center'>
                <>
                    {
                        Array(guessed).fill(0).map((_, index) => {
                            return (
                                <GuessedRow key={index} props={
                                    Array(6).fill({
                                        status: 'normal',
                                        guess: currLetter,
                                    })
                                } />
                            )
                        })
                    }
                    {
                        !complete ? <CurrentRow props={
                            Array(6).fill({
                                status: 'correct',
                                guess: currLetter,
                            })
                        }></CurrentRow> : <></>
                    }
                    {
                        Array(ROWS - guessed - (!complete)).fill(0).map((_, index) => {
                            return (
                                <EmptyRow key={index} props={
                                    Array(6).fill({
                                        status: 'normal',
                                        guess: currLetter,
                                    })
                                } />
                            )
                        })
                    }
                </>
            </Stack>
        </Box>
    )
}
