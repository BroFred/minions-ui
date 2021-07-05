import React from 'react';
import {
    Flex,
    Box,
    IconButton,
    GridItem,
    Grid,
} from "@chakra-ui/react"
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { reduce, range, sum } from 'ramda';

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
    children: ((arg: any) => React.ReactNode)[];
    strip?: boolean;
    columns: any[];
    data: any[][];
    template: 'auto' | 'even' | Array<number>
}

type stripStyle = {
    [key: string]: {
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
export const CellContainer = ({ children, textAlign = "left" }: { children: React.ReactNode, textAlign: textAlign }): JSX.Element => {
    return <Box textAlign={textAlign} textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" mx="4" minW="32" maxW="96">{children}</Box>;
};

export const ThRow = ({ children }: { children: React.ReactNode[] }) => {
    return <>{children}</>
}

export const ThPure = ({ children, size, textAlign }: TableText): JSX.Element => {
    const justifyContent = getTextAlign(textAlign);
    const h = getH(size);
    return <Flex alignItems="center" bg={'nl.08'} justifyContent={justifyContent} h={h} outline="1px solid" outlineColor="nl.05">
        <CellContainer textAlign={textAlign}>{children}</CellContainer>
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
        <CellContainer textAlign={textAlign}>{children}</CellContainer>
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
    return <GridItem bg="white"><Flex alignItems="center" outline="1px solid" outlineColor="nl.05" justifyContent={justifyContent} h={h}><CellContainer textAlign={textAlign}>{children}</CellContainer></Flex></GridItem>
}



export const Table = ({ children, strip = false, columns = [], data = [], template = 'auto' }: TableProps): JSX.Element => {
    const columnLen = columns.length;
    let girdTemplate = `repeat(${columnLen}, 1fr)`;
    let width;
    if (template === 'even') {
        girdTemplate = `repeat(${columnLen}, minmax(13rem, 1fr))`;
    }
    if (Array.isArray(template)) {
        const total = sum(template);
        const min = Math.min(...template);
        width = Math.ceil(13/min * total);
        girdTemplate = template.map((v)=>`${Math.floor(v/total*100)}%`).join(' ');
    }
    const stripStyle = strip ? reduce((aggregate: stripStyle, offset: number): stripStyle => {
        return {
            ...aggregate,
            [`*:nth-of-type(${2 * columnLen}n - ${offset})`]: {
                background: 'nl.09',
            }
        }
    },
        {}, range(0, columnLen)) : {};
    return <Grid templateColumns={girdTemplate} sx={stripStyle} minWidth={`${width}rem`}>
        {children[0](columns)}
        {children[1](data)}
    </Grid>
}