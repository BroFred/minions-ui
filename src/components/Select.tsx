import React, {useState} from 'react';
import { Select as SelectC, SelectProps as SelectPropsC, Icon, Box,
    Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  VStack
 } from '@chakra-ui/react';
 import {find, propEq} from 'ramda';
import { FaCaretDown } from "react-icons/fa";
import {Button} from './Button';
import Downshift from 'downshift'

interface SelectProps extends SelectPropsC{
    items: {
        value: unknown,
        label: string
    }[]
}
const Select = ({ select }: SelectProps): JSX.Element => {
    const {currentSelection, items} = select;
    const currentElem = find(propEq('value',currentSelection))(items);
    return (<Button 
        border='none'
        _hover={{
            boxShadow: '0 2px 1px -1px var(--chakra-colors-pri-01)',
        }}
        variant="tertiary"
        borderRadius="0.25rem"
        _focus={{
            boxShadow: 'none',
        }} rightIcon={<Icon as={FaCaretDown}/> }>{currentElem.label}</Button>)
}


Select.Option = ({value,label, currentSelection , setSelect }) => {
    return <VStack   align="stretch"  spacing={4}
    ><Button  border="none" value={value} variant="secondary" isActive={currentSelection===value} onClick={()=>setSelect(value)}>{label}</Button></VStack>
}

export const SelectLayout = ({select, children}) => {
    return <Popover>
    <PopoverTrigger>
        <Box w="fit-content">{children[0](select)}</Box>
    </PopoverTrigger>
    <PopoverContent mt="2" _focus={{
                    boxShadow: 'none',
                }}>
      <PopoverBody>{children[1](select)}</PopoverBody>
    </PopoverContent>
  </Popover>
}

export default Select