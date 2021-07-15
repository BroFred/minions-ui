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
    useColorModeValue
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
interface SelectLayoutProps extends SelectProps{
  children: ((arg: any) => React.ReactNode[])[];
}
interface SelectHeaderProps extends SelectProps {
  placeholder?: string,
}

interface SelectOptionProps extends SelectProps {
  value: string,
  label: string,
  currentSelection : string | number[],
}

export const MultipleSelect = ({ select, setSelect, placeholder='选择内容' }: SelectHeaderProps) => {
    const TagBg = useColorModeValue('nl.300', 'nd.400');
    const TagColor = useColorModeValue('nl.700', 'nd.600');
    const TagCloseColor = useColorModeValue('nl.900', 'nd.600');
    const headTextColor = useColorModeValue('nl.700', 'nd.200');
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
          ({ value, label }) => <Tag h="2rem" m="1" key={value} bg={TagBg} color={TagColor} cursor='pointer'><TagLabel>{label}</TagLabel><TagCloseButton color={TagCloseColor} onClick={(e) => {
              e.stopPropagation();
              setSelect({ ...select, currentSelection: filter((v) => v !== value, currentSelection) })
          }} /></Tag>
          , currentElem
        )
          :
          <Flex h='2.375rem' color={headTextColor} fontSize={14} alignItems='center'>{ placeholder }</Flex>
        }
    </Flex>
}

MultipleSelect.Option = ({ value, label, currentSelection, setSelect }:SelectOptionProps) => {
    const checkBoxColor = useColorModeValue('nl.600', 'nd.200');
    const listHoverBg = useColorModeValue('nl.100', 'nd.500');
    return <VStack align="stretch">
      <Checkbox 
        h='10'
        px='0.625rem'
        iconSize='1.25rem'
        iconColor='nl.13'
        color={checkBoxColor}
        _hover={{
          background: listHoverBg,
        }} 
        onChange={(e)=>{
          e.stopPropagation();
          setSelect(value);
        }} 
        value={value} 
        isChecked={currentSelection.includes(value)}>
        {label}
      </Checkbox>
    </VStack>
}

export const SelectLayout = ({ select, children, setSelect,...others}: SelectLayoutProps) => {
    const initialFocusRef = React.useRef();
    const insideRef = React.useRef();
    const [isShow, setIsShow] = useState(false);
    const selectHeaderBg = useColorModeValue('nl.100', 'nd.600');
    const selectHeaderColor = useColorModeValue('nl.700', 'nd.300');
    const selectBodyBg = useColorModeValue('nl.13', 'nd.600');
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
                <Flex position='relative' bg={selectHeaderBg} justifyContent="flex-start" alignItems='center' cursor='pointer' pl='0.875rem' pr='2rem' py='0.375rem' borderRadius='4' 
                    onClick={()=>{setSelect({ ...select })}}>
                      {children[0](select, setSelect)}
                      <Box position='absolute' right='1.25rem' top='1rem' fontSize='12' color={selectHeaderColor}>
                      {
                          isShow ? <TriangleUpIcon /> : <TriangleDownIcon />
                      }
                      </Box>
                  </Flex>
              </Box>
          </PopoverTrigger>
          <PopoverContent 
            width='12rem'
            {...others} 
            _focus={{
            boxShadow: 'none',
            }}>
              <PopoverBody px='0' py='0.375rem' maxHeight='25rem' overflowY='scroll' bg={selectBodyBg} onClick={() => setIsShow(!isShow)}>{children[1](select, setSelect)}</PopoverBody>
          </PopoverContent>
        </Popover>
    </Box>
    ) 
}

export const SingleSelect = ({ select, placeholder ='选择内容' }: SelectHeaderProps): JSX.Element => {
  const { currentSelection, items } = select;
  const currentElem = find(propEq('value', currentSelection))(items)
  const headTextColor = useColorModeValue('nl.700', 'nd.200');
  return (<Flex h='2.375rem' color={headTextColor} fontSize={14} alignItems='center'>{currentElem ? currentElem.label : placeholder}</Flex>)
}


SingleSelect.Option = ({ value, label, setSelect, currentSelection }:SelectOptionProps) => {
  const singleListColor = useColorModeValue('nl.600', 'nd.200');
  const singleListHoverBg = useColorModeValue('nl.100', 'nd.500');
  return <Box align="left"
  px={4}
  py={2.5}
  key={value}
  color={singleListColor}
  bg={currentSelection === value ? singleListHoverBg : ''}
  cursor='pointer'
  _hover={{
    bg: singleListHoverBg,
  }} onClick={()=>{setSelect(value)}} value={value}>{label}</Box>
}

export default MultipleSelect
