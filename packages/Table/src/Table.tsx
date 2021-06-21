import React from 'react';
import {
    Flex,
    Box,
    IconButton,
    GridItem,
    Grid
} from "@chakra-ui/react"
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { repeat, reduce,range } from 'ramda';

type textAlign = 'left' | 'right' | undefined;
type size = 'sm' | 'mid' | 'lg' | undefined;
type sort = {
    sortKey: string;
    isSortedDesc: boolean | undefined;
}

export interface TableText {
    children: React.ReactNode;
    size?: size;
    textAlign?: textAlign;
}

export interface ThSortProps extends TableText {
    sortKey: string;
    sort: [sort, React.Dispatch<React.SetStateAction<sort>>]
}

interface TableProps {
    children : ((arg: any)=>React.ReactNode)[];
    strip?: boolean;
    columns: any[];
    data: any[][];
}

type stripStyle = {
    [key:string]: {
        background: string;
    } | {};
}

const getTextAlign = (textAlign: textAlign): string => textAlign === 'right' ? 'flex-end' : 'space-between';
const getH = (size: size): number => {
    switch (size) {
        case 'sm':
            return 8;
        case 'mid':
            return 10;
        case 'lg':
            return 12;
        default:
            return 10;
    }
}
export const CellContainer = ({ children }: { children: React.ReactNode }): JSX.Element => {
    return <Box textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" mx="4" maxW={96} minW={12}>{children}</Box>;
};

export const ThRow = ({ children }: { children: React.ReactNode[] }) => {
    return <>{children}</>
}

export const ThPure = ({ children, size, textAlign }: TableText): JSX.Element => {
    const justifyContent = getTextAlign(textAlign);
    const h = getH(size);
    return <Flex alignItems="center" bg={'nl.08'} justifyContent={justifyContent} h={h} outline="1px solid" outlineColor="nl.05">
        <CellContainer>{children}</CellContainer>
    </Flex>
}

export const ThSort = ({ children, sort, size, textAlign, sortKey }: ThSortProps): JSX.Element => {
    const [{ isSortedDesc, sortKey: sortingKey }, setIsSortedDesc] = sort;
    const isSelfSorting = sortingKey === sortKey;
    const justifyContent = getTextAlign(textAlign);
    const setSorted = (value: boolean): boolean | undefined => {
        if (!isSelfSorting) {
            return value
        }
        return isSortedDesc === value ? undefined : value;
    }
    const h = getH(size);
    return <Flex alignItems="center" bg={'nl.08'} outline="1px solid" outlineColor="nl.05" justifyContent={justifyContent} h={h}>
        <CellContainer>{children}</CellContainer>
        <Flex flexDirection="column">
            <IconButton onClick={() => setIsSortedDesc({
                sortKey,
                isSortedDesc: setSorted(false)
            })} borderRadius="full" aria-label="table sort" icon={<ChevronUpIcon />} variant="ghost" h={2} w={2} color={(isSelfSorting && isSortedDesc === false) ? 'pri.01' : 'nl.01'} />
            <IconButton onClick={() => setIsSortedDesc(
                {
                    sortKey,
                    isSortedDesc: setSorted(true)
                }
            )} borderRadius="full" aria-label="table sort" icon={<ChevronDownIcon />} variant="ghost" h={2} w={2} color={(isSelfSorting && isSortedDesc === true) ? 'pri.01' : 'nl.01'} />
        </Flex>
    </Flex>
}

export const TdPure = ({ children, size, textAlign }: TableText) => {
    const justifyContent = getTextAlign(textAlign);
    const h = getH(size);
    return <GridItem bg="white"><Flex alignItems="center" outline="1px solid" outlineColor="nl.05" justifyContent={justifyContent} h={h}><CellContainer>{children}</CellContainer></Flex></GridItem>
}



export const Table = ({ children, strip=false, columns=[], data=[] }:TableProps): JSX.Element => {
    const columnLen = columns.length;
    const girdTemplate = repeat('1fr', columnLen).join(" ");
    const stripStyle = strip ? reduce((aggregate:stripStyle, offset:number):stripStyle =>{
        return {
            ...aggregate,
            [`*:nth-of-type(${2*columnLen}n - ${offset})`]: {
                background: 'nl.09',
            }
        }
    },
    {},range(0,columnLen)):{};
    return <Grid templateColumns={girdTemplate} sx={stripStyle}>
        {children[0](columns)}
        {children[1](data)}
    </Grid>
}