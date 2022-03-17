import React from 'react'
import { SimpleGrid, Box, Button, Stack } from '@chakra-ui/react'
import { useProbable } from '../Context/ProbableProvider';

function getColor(status) {
    switch (status) {
        case 'correct':
            return 'green';
        case 'partial':
            return 'orange';
        case 'wrong':
            return 'grey';
        case 'normal':
            return 'bluegray';
        default:
            return 'bluegray';
    }
}

const Key = ({ children, props, onClick, status }) => {

    return (
        <Button
            h='40px' 
            minWidth='4.7vh'
            textAlign='center' fontSize='0.8rem' fontWeight='300'
            paddingY='auto'
            paddingX='auto'
            borderRadius = '0px'
            backgroundColor = {getColor(status)}
            onClick={() => onClick(props)}
        >
            {children}
        </Button>
    )
}



const qwertyOne = "QWERTYUIOP";
const qwertyTwo = "ASDFGHJKL";
const qwertyThree = "ZXCVBNM";


export default function KeyBoard(props) {
    const { keyboardStatus} = useProbable();
   
    return (

        <
        // bg = 'black'
        // paddingX  ='3px'
        // paddingY  ='3px'
        >
            <Stack spacing = '0px'>

            <SimpleGrid columns={10} spacingX='0px' spacingY='0px'>
                {
                    Array.from(qwertyOne).map((value, index) => {
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
            <SimpleGrid columns={9} spacingX='0px' spacingY='0px' paddingX="1.4vh">
                {
                    Array.from(qwertyTwo).map((value, index) => {
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

            <SimpleGrid columns={7} spacingX='0px' spacingY='0px' paddingX="6.5vh">
                {
                    Array.from(qwertyThree).map((value, index) => {
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


                    </Stack>

                    
            <SimpleGrid columns={2}  spacingX='10px' paddingX='auto'>
            
            <Button
                h='6.5vh' w='100%'
                textAlign='center' fontSize='1rem' fontWeight='500'
                paddingY='auto'
                paddingX='auto'

                onClick={() => props.onClick('back')}
            >
                BackSpace ⌫
            </Button>
            <Button
                h='6.5vh' w='100%'
                textAlign='center' fontSize='1rem' fontWeight='500'
                paddingY='auto'
                paddingX='auto'
                backgroundColor = {getColor(keyboardStatus['A'])}

                onClick={() => props.onClick('enter')}
            >
            Enter
            </Button>
            </SimpleGrid>
        </>
           
    )
}
