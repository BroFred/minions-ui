import React, { useState, useRef, useEffect } from 'react';
import {
    Select as SelectC, SelectProps as SelectPropsC, Icon, Box,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    useOutsideClick,
    Tag,
    VStack,
    Input,
    InputGroup,
    InputLeftElement,
    TagLabel,
    TagCloseButton,
    Flex
} from '@chakra-ui/react';
import { find, propEq, filter, map } from 'ramda';
import { FaCaretDown } from "react-icons/fa";
import { Button } from './Button';
import { useMeasure } from 'react-use';

interface SelectProps extends SelectPropsC {
    items: {
        value: unknown,
        label: string
    }[]
}
const Select = ({ select }: SelectProps): JSX.Element => {
    const { currentSelection, items } = select;
    const currentElem = find(propEq('value', currentSelection))(items);
    return (<Button
        border='none'
        _hover={{
            boxShadow: '0 2px 1px -1px var(--chakra-colors-pri-01)',
        }}
        variant="tertiary"
        borderRadius="0.25rem"
        _focus={{
            boxShadow: 'none',
        }} rightIcon={<Icon as={FaCaretDown} />}>{currentElem.label}</Button>)
}


Select.Option = ({ value, label, currentSelection, setSelect }) => {
    return <VStack align="stretch" spacing={4}
    ><Button border="none" value={value} variant="secondary" isActive={currentSelection === value} onClick={() => setSelect(value)}>{label}</Button></VStack>
}

interface multiSelect {
    select: {
        items: {
            value: string | number;
            label: string;
        }[];
        currentSelection: string | number[];
        filter: string | number;
    }
}
export const MultipleSelect = ({ select, setSelect }: multiSelect) => {
    const { currentSelection, items, filter: selectFilter } = select;
    const [isFocus, setIsFocus] = useState(false);
    const currentRef = useRef()
    const currentElem = filter(
        ({ value }) => {
            return currentSelection.includes(value);
        }
        , items
    );

    return <Flex outline={isFocus ? '1px solid' : "0px solid"} outlineColor="pri.01" w="13rem" p="1"
        flexWrap="wrap" h="auto"
        justifyContent="flex-start"
        onClick={(e) => {
            e.preventDefault();
            setIsFocus(true)
            setSelect({ ...select, filter: "" })
            currentRef.current.focus();
        }}
    >
        {
            map(
                ({ value, label }) => <Tag h="2rem" m="1" key={value}><TagLabel>{label}</TagLabel><TagCloseButton onClick={(e) => {
                    e.stopPropagation();
                    setSelect({ ...select, currentSelection: filter((v) => v !== value, currentSelection) })
                }} /></Tag>
                , currentElem
            )
        }
        <Flex flex={1}>
            <Input
                ref={currentRef}
                value={selectFilter}
                onChange={(event) => setSelect({ ...select, filter: event.target.value })}
                onFocus={
                    () => setIsFocus(true)
                }
                onBlur={
                    () => {
                        setSelect({ ...select })
                        setIsFocus(false);
                    }
                }
                border="none"
                _focus={{
                    boxShadow: 'none'
                }}
            />
        </Flex>
    </Flex>
}
MultipleSelect.Option = ({ value, label, currentSelection, setSelect }) => {
    return <VStack align="stretch" spacing={4}
    ><Button border="none" value={value} variant="secondary" isActive={currentSelection.includes(value)} onClick={() => setSelect(value)}>{label}</Button></VStack>
}

export const SelectLayout = ({ select, children, setSelect }) => {
    const { filter } = select;
    const initialFocusRef = React.useRef();
    const insideRef = React.useRef();
    const [isShow, setIsShow] = useState(false);
    useOutsideClick({
        ref: insideRef,
        handler: () => setIsShow(false)
    });
    return <Box ref={insideRef} display="inline-block"><Popover isOpen={isShow} initialFocusRef={initialFocusRef}>
        <PopoverTrigger>
            <Box onClick={() => setIsShow(true)} w="fit-content" ref={initialFocusRef} >{children[0](select, setSelect)}</Box>
        </PopoverTrigger>
        <PopoverContent mt="2" _focus={{
            boxShadow: 'none',
        }}>
            <PopoverBody >{children[1](select, setSelect)}</PopoverBody>
        </PopoverContent>
    </Popover></Box>
}

export default Select