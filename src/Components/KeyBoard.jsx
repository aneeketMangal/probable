import React, { useEffect } from 'react'
import { SimpleGrid, Box, Button } from '@chakra-ui/react'
import { useProbable } from '../Context/ProbableProvider';

function getColor(status) {
    console.log("temppd")
    switch (status) {
        case 'correct':
            return 'green';
        case 'partial':
            return 'orange';
        case 'wrong':
            return 'grey';
        case 'normal':
            return 'transparent';
        default:
            return 'bluegray';
    }
}

const Key = ({ children, props, onClick, status }) => {
    // create a custom event
    console.log("key called")
    console.log(status)
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
    const { keyboardStatus, setKeyboardStatus, guessCount} = useProbable();
    
    // useEffect(() => {
    //     console.log("keyboardStatus", keyboardStatus);
    //     setKeyboardStatus(keyboardStatus);
    // }, [keyboardStatus]);


    return (

        <>
            
            <SimpleGrid columns={9} spacingX='5px' spacingY='10px' paddingX='auto'>
                {
                    Array.from(qwerty).map((value, index) => {
                        return (
                            <Key
                            key={index}
                            props={value}
                            status = {keyboardStatus[value.charCodeAt(0) - 65]}    
                            onClick={props.onClick}
                            >{value}</Key>
                            )
                        })
                    }
            </SimpleGrid>
                    {props.test}
            <SimpleGrid columns={2}  spacingX='10px' paddingX='auto'>
            
            <Button
                key = {'tempp'}
                h='6.5vh' w='100%'
                textAlign='center' fontSize='1rem' fontWeight='500'
                paddingY='auto'
                paddingX='auto'
                backgroundColor = {getColor(keyboardStatus['A'])}

                onClick={() => props.onClick('enter')}
            >
                {keyboardStatus[0]}
            </Button>
            <Button
            key = {'temp'}
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
