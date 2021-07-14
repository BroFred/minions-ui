import React, { useState } from 'react';
import {
    Box,
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
    useColorMode
} from '@chakra-ui/react';
import { TriangleUpIcon,TriangleDownIcon } from '@chakra-ui/icons'
import { filter, map, propEq, find } from 'ramda';
export interface SelectProps {
    select: {
        items: {
            value: string | number;
            label: string;
        }[];
        currentSelection: string | number[];
    },
    setSelect: (param:object|string)=>void
}
interface LayoutSelectProps extends SelectProps{
  children: ((arg: any) => React.ReactNode[])[];
}
interface SelectHeaderProps extends SelectProps {
  placeholder?: string,
}

interface SelectOptionProps extends SelectProps {
  value: string,
  label: string,
  currentSelection : number[],
}

export const MultipleSelect = ({ select, setSelect, placeholder='选择内容' }: SelectHeaderProps) => {
    const { colorMode } = useColorMode();
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
          ({ value, label }) => <Tag h="2rem" m="1" key={value} bg={colorMode === 'light' ? 'nl.300' : 'nd.400'} color={colorMode === 'light' ? 'nl.700' : 'nd.600'} cursor='pointer'><TagLabel>{label}</TagLabel><TagCloseButton color={colorMode === 'light' ? 'nl.900' : 'nd.600'} onClick={(e) => {
              e.stopPropagation();
              setSelect({ ...select, currentSelection: filter((v) => v !== value, currentSelection) })
          }} /></Tag>
          , currentElem
        )
          :
          <Flex h='2.375rem' color={colorMode === 'light' ? 'nl.700' : 'nd.200'} fontSize={14} alignItems='center'>{ placeholder }</Flex>
        }
    </Flex>
}
MultipleSelect.Option = ({ value, label, currentSelection, setSelect }:SelectOptionProps) => {
    const { colorMode } = useColorMode();
    return <VStack align="stretch">
      <Checkbox 
        h='10'
        px='0.625rem'
        iconSize='1.25rem'
        iconColor='nl.13'
        color={colorMode === 'light' ? 'nl.600' : 'nd.200'}
        _hover={{
          background: colorMode === 'light' ? 'nl.100' : 'nd.500',
        }} onChange={(e)=>{
          e.stopPropagation();
          setSelect(value);
        }} value={value} isChecked={currentSelection.includes(value)}>
        {label}
      </Checkbox>
    </VStack>
}

export const SelectLayout = ({ select, children, setSelect,...others}: LayoutSelectProps) => {
    const initialFocusRef = React.useRef();
    const insideRef = React.useRef();
    const [isShow, setIsShow] = useState(false);
    const { colorMode } = useColorMode();
    useOutsideClick({
        ref: insideRef,
        handler: () => {
          setIsShow(false)
        }
    });
    return (
      <Box ref={insideRef} display="inline-block">
        <Popover isOpen={isShow} initialFocusRef={initialFocusRef} >
          <PopoverTrigger>
              <Box width='12rem' {...others} p='0' onClick={() => setIsShow(!isShow)}  ref={initialFocusRef} >
                <Flex position='relative' bg={colorMode === 'light' ? 'nl.100' : 'nd.600'} justifyContent="flex-start" alignItems='center' cursor='pointer' pl='0.875rem' pr='2rem' py='0.375rem' borderRadius='4' 
                    onClick={()=>{setSelect({ ...select, filter: "" })}}>
                      {children[0](select, setSelect)}
                      <Box position='absolute' right='1.25rem' top='1rem' fontSize='12' color={colorMode === 'light' ? 'nl.700' : 'nd.300'}>
                      {
                          isShow ? <TriangleUpIcon /> : <TriangleDownIcon />
                      }
                      </Box>
                  </Flex>
              </Box>
          </PopoverTrigger>
          <PopoverContent width='12rem' {...others} _focus={{
            boxShadow: 'none',
          }}>
              <PopoverBody px='0' py='0.375rem' maxHeight='25rem' overflowY='scroll' bg={colorMode === 'light' ? 'nl.13' : 'nd.600'} onClick={() => setIsShow(!isShow)}>{children[1](select, setSelect)}</PopoverBody>
          </PopoverContent>
        </Popover>
    </Box>
    ) 
}

export const SingleSelect = ({ select, placeholder ='选择内容' }: SelectHeaderProps): JSX.Element => {
  const { colorMode } = useColorMode();
  const { currentSelection, items } = select;
  const currentElem = find(propEq('value', currentSelection))(items)
  return (<Flex h='2.375rem' color={colorMode === 'light' ? 'nl.700' : 'nd.200'} fontSize={14} alignItems='center'>{currentElem ? currentElem.label : placeholder}</Flex>)
}


SingleSelect.Option = ({ value, label, setSelect }:SelectOptionProps) => {
  const { colorMode } = useColorMode();
  return <Box align="left"
  px={4}
  py={2.5}
  key={value}
  color={colorMode === 'light' ? 'nl.·600' : 'nd.200'}
  _hover={{
    bg: colorMode === 'light' ? 'nl.100' : 'nd.500',
  }} onClick={()=>{setSelect(value)}} value={value}>{label}</Box>
}

export default MultipleSelect
