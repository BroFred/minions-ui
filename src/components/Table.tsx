import React, {useState} from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Flex,
    Box,
    IconButton,
    HStack
} from "@chakra-ui/react"
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';


type sort = boolean | undefined;
export interface ThSortProps {
    children: React.ReactNode;
    sort?: [ sort, React.Dispatch<React.SetStateAction<sort>> ]
}


export const ThSort = ({ children, sort }: ThSortProps): JSX.Element => {
    const [_isSortedDesc, _setIsSortedDesc] = useState<sort>();
    let isSortedDesc:sort, setIsSortedDesc: React.Dispatch<React.SetStateAction<sort>>;
    if(sort){
        [isSortedDesc,setIsSortedDesc] = sort;
    }
    else{
        [isSortedDesc,setIsSortedDesc] = [_isSortedDesc, _setIsSortedDesc];
    }
    return <Flex alignItems="center" bg={'nl.08'} border="1px" borderColor="nl.05" justifyContent="space-between">
        <Box mx="3.5">{children}</Box>
        <Flex flexDirection="column">
            <IconButton onClick={ ()=>setIsSortedDesc(isSortedDesc===false ? undefined: false)}  borderRadius="full" aria-label="table sort" icon={<ChevronUpIcon />} variant="ghost"   h={2} w={2} color={isSortedDesc===false? 'pri.01' : 'nl.01' }/>
            <IconButton  onClick={ ()=>setIsSortedDesc(isSortedDesc===true ? undefined: true)}  borderRadius="full" aria-label="table sort" icon={<ChevronDownIcon />} variant="ghost"  h={2} w={2} color={isSortedDesc===true? 'pri.01' : 'nl.01'}/>
        </Flex>
    </Flex>
}