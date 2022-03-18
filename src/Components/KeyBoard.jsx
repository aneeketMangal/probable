import React from 'react'
import { SimpleGrid, Button, Stack } from '@chakra-ui/react'
import { useProbable } from '../Context/ProbableProvider';
import {ArrowLeftIcon, CheckIcon} from "@chakra-ui/icons"


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
        h={{base: '5vh', sm: '5vh', md: '6vh', lg: '6vh', xl: '6vh'}}
            minWidth={{ base: '27px', sm: '27px', md: '50px', lg: '50px' }} 
            // minWidth='6vh'
            textAlign='center' 
            fontSize={{base: '1.3rem', sm: '1.3rem', md: '2rem', lg: '2rem'}} 
            fontWeight='400'
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
            <Stack spacing = '10px'>

            <SimpleGrid columns={10} spacingX='10px' spacingY='0px'>
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
            <SimpleGrid columns={9} spacingX='10px' spacingY='0px' paddingX="1.4vh">
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

            <SimpleGrid columns={7} spacingX='10px' spacingY='0px' paddingX="6.5vh">
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
                rightIcon={<ArrowLeftIcon />}
                h='6.5vh' w='100%'
                textAlign='center' fontSize='1rem' fontWeight='500'
                paddingY='auto'
                paddingX='auto'
                
                onClick={() => props.onClick('back')}
                >
                 BackSpace
            </Button>
            <Button
                rightIcon={<CheckIcon />}
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
