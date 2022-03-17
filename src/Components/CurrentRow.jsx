import React from 'react'
import {
    Stack
}
    from '@chakra-ui/react'
import GridItem from './GridItem';


export default function CurrentRow({ word }) {
    const len = 5- word.length;

    return (
        <Stack direction={'row'} spacing={3} justifyContent='center'>
            {Array.from(word).map((val, index) => {
                return (
                    <GridItem key= {index} status='normal' guess={val} />
                )
            })
            }
            {
                Array(len).fill(0).map((_, index) => {
                    return (
                        <GridItem key= {index} status='normal' guess =''/>
                    )
                })
            }

            
        </Stack>

    )
}
