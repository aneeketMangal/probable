import React from 'react'
import { SimpleGrid, Box, Button } from '@chakra-ui/react'
import { useProbable } from '../Context/ProbableProvider';

function getColor(status) {
    switch (status) {
        case 'correct':
            return 'green';
        case 'partial':
            return 'orange';
        case 'wrong':
            return 'grey';
        default:
            return 'bluegrey';
    }
}

function Key({ children, props, onClick, status }) {
    // create a custom event
    const customEvent = new CustomEvent('KeyBoard', {
        details: {
            key: props
        }
    });
    return (
        <Button
            h='6.5vh' w='100%'
            textAlign='center' fontSize='2rem' fontWeight='500'
            paddingY='auto'
            paddingX='auto'
            backgroundColor = {getColor(status)}
            onClick={() => onClick(props)}
        >
            {children}
        </Button>
    )
}

const qwerty = "QWERTYUIOPASDFGHJKLZXCVBNM";

export default function KeyBoard(props) {
    const { keyboardStatus, setKeyboardStatus} = useProbable();
    
    return (

        <>
            <SimpleGrid columns={9} spacingX='5px' spacingY='10px' paddingX='auto'>
                {
                    Array.from(qwerty).map((value, index) => {
                        return (
                            <Key
                                key={index}
                                props={value}
                                status = {keyboardStatus[value]}    
                                onClick={props.onClick}
                            >{value}</Key>
                        )
                    })
                }
            </SimpleGrid>
            <SimpleGrid columns={2}  spacingX='10px' paddingX='auto'>
            
            <Button
                
                h='6.5vh' w='100%'
                textAlign='center' fontSize='1rem' fontWeight='500'
                paddingY='auto'
                paddingX='auto'

                onClick={() => props.onClick('enter')}
            >
                Enter ⏎
            </Button>
            <Button
                h='6.5vh' w='100%'
                textAlign='center' fontSize='1rem' fontWeight='500'
                paddingY='auto'
                paddingX='auto'

                onClick={() => props.onClick('back')}
            >
                BackSpace ⌫
            </Button>
            </SimpleGrid>
        </>
           
    )
}
