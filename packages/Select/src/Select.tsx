import React, { useState, useRef } from 'react';
import {
    Select as SelectC, SelectProps as SelectPropsC, Box,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    useOutsideClick,
    Tag,
    VStack,
    TagLabel,
    TagCloseButton,
    Flex,
    Checkbox,
} from '@chakra-ui/react';
import { TriangleUpIcon,TriangleDownIcon } from '@chakra-ui/icons'
import { filter, map } from 'ramda';

interface SelectProps extends SelectPropsC {
    items: {
        value: unknown,
        label: string
    }[]
}

interface multiSelect {
    select: {
        items: {
            value: string | number;
            label: string;
        }[];
        currentSelection: string | number[];
    }
}
export const MultipleSelect = ({ select, setSelect, isShow }: multiSelect) => {
    const { currentSelection, items } = select;
    const currentElem = filter(
        ({ value }) => {
            return currentSelection.includes(value);
        }
        , items
    );

    return <Flex position='relative' bg='nl.100' height='auto'
        width='300px' flexWrap="wrap"  justifyContent="flex-start" alignItems='center' pl='0.875rem' pr='2rem' py='0.375rem' borderRadius='4' onClick={(e)=>{e.preventDefault();
          setSelect({ ...select, filter: "" })}}>
            { currentSelection?.length ?
            map(
              ({ value, label }) => <Tag h="2rem" m="1" key={value} bg='nl.300'><TagLabel>{label}</TagLabel><TagCloseButton onClick={(e) => {
                  e.stopPropagation();
                  setSelect({ ...select, currentSelection: filter((v) => v !== value, currentSelection) })
              }} /></Tag>
              , currentElem
            )
              :
              <Flex h='2.375rem' color='nl.700' fontSize={14} alignItems='center'>选择内容</Flex>
            }
            {
                isShow ? <TriangleUpIcon position='absolute' right='1.25rem' top='1.2rem' fontSize='12' onClick={()=>{setSelect({ ...select})}}/> : <TriangleDownIcon  position='absolute' right='1.25rem' top='1.2rem' fontSize='12' onClick={()=>{setSelect({ ...select})}}/>
            }
        </Flex>
}
MultipleSelect.Option = ({ value, label, currentSelection, setSelect }) => {
    return <VStack align="stretch">
      <Checkbox 
        size='lg'
        h='10'
        px='0.625rem'
        colorScheme='blue'
        color='nl.700'
        _hover={{
          background: "nl.100",
        }} onChange={()=>{setSelect(value)}} value={value} isChecked={currentSelection.includes(value)}>
        {label}
      </Checkbox>
    </VStack>
}

export const SelectLayout = ({ select, children, setSelect }) => {
    const initialFocusRef = React.useRef();
    const insideRef = React.useRef();
    const [isShow, setIsShow] = useState(false);
    useOutsideClick({
        ref: insideRef,
        handler: () => {
          setIsShow(false)
        }
    });
    return (
      <Box ref={insideRef} display="inline-block">
        <Popover isOpen={isShow} initialFocusRef={initialFocusRef}>
          <PopoverTrigger>
              <Box position='relative' width='300px' p='0' onClick={() => setIsShow(!isShow)}  ref={initialFocusRef} >
                {children[0](select, setSelect, isShow)}
              </Box>
          </PopoverTrigger>
          <PopoverContent width='300px' _focus={{
            boxShadow: 'none',
          }}>
              <PopoverBody px='0' py='0.375rem' maxHeight='25rem' overflowY='scroll'>{children[1](select, setSelect)}</PopoverBody>
          </PopoverContent>
        </Popover>
    </Box>
    )
    
}

export default MultipleSelect