import React from 'react'
import {
    Box,
    Stack
}
    from '@chakra-ui/react'
import GridItem from './GridItem';


export default function CurrentRow({ props }) {
    return (
        <Stack direction={'row'} spacing={3} justifyContent='center'>
            {props.map((_, index) => {
                return (
                    <GridItem {...props[index]}/>
                )
            })
            }
        </Stack>

    )
}