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
import Button,{ ButtonProps } from '@minion-ui/button';
import { TriangleUpIcon,TriangleDownIcon } from '@chakra-ui/icons'
import { filter, map, propEq, find } from 'ramda';

type size = 'sm' | 'md' | 'lg';
type status = 'default' | 'disabled' | 'warning' | 'error';


let defaultSize:size = 'sm'
export interface SelectProps extends ButtonProps {
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
  width?: string,
  height?: string,
  size?: size,
  status?: status,
  children: ((arg: any) => React.ReactNode[])[],
}
interface SelectHeaderProps extends SelectProps {
  placeholder?: string,
}

interface SelectOptionProps extends SelectProps {
  value: string,
  label: string,
  currentSelection : string | number[],
}

const getSizeStyle = (size: size):object => {
  const sizeStyle = {
    'sm': {
      h: '2rem',
      iconM: '0.6875rem',
      tagH: '1.5rem',
      tagM: '0.25rem',
    },
    'md': {
      h: '2.5rem',
      iconM: '0.875rem',
      tagH: '1.75rem',
      tagM: '0.375rem',
    },
   'lg': {
     h: '3rem',
     iconM: '1.125rem',
     tagH: '1.75rem',
     tagM: '0.625rem',
   }
  }
  return sizeStyle[size]
}

const getTypeStyle = (status: status):object => {
  const typeStyle = {
    'default': {
      borderBottomWidth: '0rem',
    },
    'disabled': {
      borderBottomWidth: '0rem',
    },
    'warning': {
      borderBottomWidth: '0.125rem',
      borderBottomColor: 'orange.300',
    },
    'error': {
      borderBottomWidth: '0.125rem',
      borderBottomColor: 'red.500',
    }
  }
  return typeStyle[status]
}

const getModeHoverStyle = (mode: string):object => {
  const hoverStyle = {
    '_hover':{
      borderBottomWidth: '0.0625rem',
      borderBottomColor: 'blue.500',
    },
    '_active':{
      borderBottomWidth: '0.125rem',
      borderBottomColor: 'blue.500',
    }
  }
  return mode === 'text' ? {} : hoverStyle
}

const getModeBgStyle = (mode: string):object => {
  const bgStyle = {
    bg:useColorModeValue('nl.700', 'nd.600'),
    '_hover':{
      bg:useColorModeValue('nl.700', 'nd.600'),
    },
    '_active':{
      bg:useColorModeValue('nl.700', 'nd.600'),
    }
  }
  return mode === 'text' ? {} : bgStyle
}

export const MultipleSelect = ({ select, setSelect, placeholder='选择内容'  }: SelectHeaderProps) => {
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
          ({ value, label }) => <Tag h={getSizeStyle(defaultSize).tagH} mr="0.5rem" my={getSizeStyle(defaultSize).tagM} key={value} bg={TagBg} color={TagColor} cursor='pointer'><TagLabel>{label}</TagLabel><TagCloseButton color={TagCloseColor} onClick={(e) => {
              e.stopPropagation();
              setSelect({ ...select, currentSelection: filter((v) => v !== value, currentSelection) })
          }} /></Tag>
          , currentElem
        )
          :
          <Flex h={getSizeStyle(defaultSize).h} color={headTextColor} fontSize={14} alignItems='center'>{ placeholder }</Flex>
        }
    </Flex>
}

MultipleSelect.Option = ({ value, label, currentSelection, setSelect,...others }:SelectOptionProps) => {
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
        isChecked={currentSelection.includes(value)}
        {...others}
        >
        {label}
      </Checkbox>
    </VStack>
}

const getIconComp = (isShow:boolean)=> isShow ? <TriangleUpIcon/>:<TriangleDownIcon/>

export const SelectLayout = ({ select, children, setSelect, width='15rem', size='sm', status='default', mode='tertiary', colorScheme='nl',...others}: SelectLayoutProps) => {
    const initialFocusRef = React.useRef();
    const insideRef = React.useRef();
    const [isShow, setIsShow] = useState(false);
    defaultSize = size
    let selectHeaderColor = useColorModeValue('nl.700', 'nd.300');
    if(status === 'disabled'){
      selectHeaderColor = useColorModeValue('nl.300', 'nd.500');
    }
    const selectBodyBg = useColorModeValue('nl.13', 'nd.600');
    useOutsideClick({
        ref: insideRef,
        handler: () => {
          setIsShow(false)
        }
    });
    const isDisabled = status === 'disabled';
    return (
      <Box ref={insideRef} display="inline-block">
        <Popover isOpen={isShow} initialFocusRef={initialFocusRef} >
          <PopoverTrigger>
              <Flex
                w={width}
                cursor='pointer' 
                {...getTypeStyle(status)} 
                {...getModeHoverStyle(mode)} 
                onClick={() => {
                  if(isDisabled) return
                  setIsShow(!isShow)
                }}
                ref={initialFocusRef} >
                <Button 
                  mode={mode} 
                  colorScheme={colorScheme}
                  minH={getSizeStyle(size).h} 
                  height='auto'
                  w='full'
                  pl='0.5rem' 
                  pr={getSizeStyle(size).iconM}
                  py='0'
                  display='flex'
                  justifyContent='space-between'
                  alignItems='flex-start'
                  cursor='pointer'
                  fontWeight='normal'
                  borderRadius='4' 
                  {...getModeBgStyle(mode)}
                  {...others}
                  isDisabled = {isDisabled}
                 >
                  {children[0](select, setSelect)}
                  <Flex color={selectHeaderColor} fontSize='12' mt={getSizeStyle(size).iconM}>
                    {
                      children[2] ? children[2](isShow) : getIconComp(isShow)
                    }
                  </Flex>
                </Button>
              </Flex>
          </PopoverTrigger>
          {
            !isDisabled ? 
          <PopoverContent 
            width='auto'
            minWidth={width}
            _focus={{
            boxShadow: 'none',
            }}>
              <PopoverBody px='0' py='0' maxHeight='25rem' overflowY='scroll' bg={selectBodyBg} onClick={() => setIsShow(!isShow)}>{children[1](select, setSelect)}</PopoverBody>
          </PopoverContent> : null
          }
        </Popover>
    </Box>
    ) 
}

export const SingleSelect = ({ select, placeholder ='选择内容' }: SelectHeaderProps): JSX.Element => {
  const { currentSelection, items } = select;
  const currentElem = find(propEq('value', currentSelection))(items)
  return (<Flex h={getSizeStyle(defaultSize).h} fontSize={14} alignItems='center'>{currentElem ? currentElem.label : placeholder}</Flex>)
}


SingleSelect.Option = ({ value, label, setSelect, currentSelection, ...others }:SelectOptionProps) => {
  const singleListColor = useColorModeValue('nl.600', 'nd.200');
  const singleListHoverBg = useColorModeValue('nl.100', 'nd.500');
  return <Box 
  px={4}
  py={2.5}
  key={value}
  color={singleListColor}
  bg={currentSelection === value ? singleListHoverBg : ''}
  cursor='pointer'
  _hover={{
    bg: singleListHoverBg,
  }}
  onClick={()=>{setSelect(value)}} value={value}
  {...others}
  >{label}</Box>
}

export default MultipleSelect
