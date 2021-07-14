import React, { useState, useRef } from 'react';
import {
    Select, SelectProps, Box,
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

interface multiSelect {
    select: {
        items: {
            value: string | number;
            label: string;
        }[];
        currentSelection: string | number[];
    }
}
export const MultipleSelect = ({ select, setSelect, placeholder='选择内容' }: multiSelect) => {
    const { currentSelection, items } = select;
    const currentElem = filter(
        ({ value }) => {
            return currentSelection.includes(value);
        }
        , items
    );

    return <Flex width='full' flexWrap="wrap">
        { currentSelection?.length ?
        map(
          ({ value, label }) => <Tag h="2rem" m="1" key={value} bg='nl.300' cursor='pointer'><TagLabel>{label}</TagLabel><TagCloseButton onClick={(e) => {
              e.stopPropagation();
              setSelect({ ...select, currentSelection: filter((v) => v !== value, currentSelection) })
          }} /></Tag>
          , currentElem
        )
          :
          <Flex h='2.375rem' color='nl.700' fontSize={14} alignItems='center'>{ placeholder }</Flex>
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

export const SelectLayout = ({ select, children, setSelect,...others}) => {
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
              <Box width='12rem' {...others} p='0' onClick={() => setIsShow(!isShow)}  ref={initialFocusRef} >
                <Flex position='relative' bg='nl.100' justifyContent="flex-start" alignItems='center' cursor='pointer' pl='0.875rem' pr='2rem' py='0.375rem' borderRadius='4' 
                    onClick={()=>{setSelect({ ...select, filter: "" })}}>
                      {children[0](select, setSelect)}
                      {
                          isShow ? <TriangleUpIcon position='absolute' right='1.25rem' top='1.2rem' fontSize='12' /> : <TriangleDownIcon  position='absolute' right='1.25rem' top='1.2rem' fontSize='12'/>
                      }
                  </Flex>
              </Box>
          </PopoverTrigger>
          <PopoverContent width='12rem' {...others} _focus={{
            boxShadow: 'none',
          }}>
              <PopoverBody px='0' py='0.375rem' maxHeight='25rem' overflowY='scroll'>{children[1](select, setSelect)}</PopoverBody>
          </PopoverContent>
        </Popover>
    </Box>
    )
    
}

export default MultipleSelect