import React from 'react'
import {
    Box,
}
from '@chakra-ui/react'


const height = '7vh'
const width = '7vh'
const border = '1px solid gray'

const colors = {
    'correct': 'green',
    'partial': 'orange',
    'normal': 'transparent',
    'wrong': 'grey'
}

export default function GridItem (props) {
    
    return (
        <Box 
            border= {border} 
            height={height}
            width={width}
            bg = {colors[props.status]}
            display = 'inline-block'
            fontWeight = {700}
            fontSize = '2.1rem'
            textAlign = 'center'
            paddingY = 'auto'
        >
            {props.guess.toUpperCase()}
        </Box>
    )
}