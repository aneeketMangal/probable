import React from 'react'
import {
    Box,
    Stack
}
    from '@chakra-ui/react'
import GridItem from './GridItem';
import { useProbable } from '../Context/ProbableProvider';




export default function GuessedRow({word}) {
    const {getStatus, guessed} = useProbable();
    console.log("word", word, typeof(word));
    
    return (
        
        <Stack direction={'row'} spacing={3} justifyContent='center'>
            {Array.from(word).map((val, index) => {
                return (
                    <GridItem key = {index} status={getStatus(val, index)} guess = {val}/>
                )
            })
            }
        </Stack>

    )
}
