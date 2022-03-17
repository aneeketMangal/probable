import React from 'react'
import {
    Stack
}
    from '@chakra-ui/react'
import GridItem from './GridItem';

const COLUMNS = 5;

export default function EmptyRow({ props }) {
    return (
        <Stack direction={'row'} spacing={3} justifyContent='center'>
            {Array(COLUMNS).fill(0).map((_, index) => {
                return (
                    <GridItem key= {index} status='normal' guess =''/>
                )
            })
            }
        </Stack>

    )
}
