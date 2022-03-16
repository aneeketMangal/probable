import React from 'react'
import { SimpleGrid, Box, Button } from '@chakra-ui/react'


function Key({ children, props, onClick }) {
    // create a custom event
    const customEvent = new CustomEvent('KeyBoard', { 
        details:{
            key: props
        }
    });
    return (
        <Button
            h='6.5vh' w='5vh'
            textAlign='center' fontSize='1rem' fontWeight='500'
            paddingY='auto' 
            paddingX='auto'
            
            onClick = {() => onClick(props)}
            >
            {children}
        </Button>
    )
}

export default function KeyBoard(props) {
    return (

        <SimpleGrid columns={7} spacingX='10px' spacingY='10px' paddingX='auto'>
            <>
                {
                    Array(26).fill(0).map((_, index) => {
                        return (
                            <Key 
                            key={index} 
                            props={String.fromCharCode(65 + index)}
                            onClick={props.onClick}
                            >{String.fromCharCode(65 + index)}</Key>
                        )
                    })
                }
            </>
            <Key props="back" onClick={props.onClick}>⌫</Key>
            <Key props="enter" onClick = {props.onClick}>⏎</Key>

        </SimpleGrid>
    )
}
