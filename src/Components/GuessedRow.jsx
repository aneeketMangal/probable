import React from 'react'
import {
    Box,
    Stack
}
    from '@chakra-ui/react'
import GridItem from './GridItem';
import { useProbable } from '../Context/ProbableProvider';

function getStatus(letterInGuess, index, word) {
    if(letterInGuess === word[index]) {
        return 'correct';
    }
    if(word.includes(letterInGuess)){
        return 'partial';
    }
    return 'wrong';
}


export default function GuessedRow({ word }) {
    const {currWord} = useProbable();
    return (
        <Stack direction={'row'} spacing={3} justifyContent='center'>
            {Array.from(word).map((val, index) => {
                return (
                    <GridItem status={getStatus(val, index, currWord)} guess = {val}/>
                )
            })
            }
        </Stack>

    )
}
