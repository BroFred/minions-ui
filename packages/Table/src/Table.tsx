import React, { Children, useMemo } from 'react';
import {
    Flex,
    Box,
    GridItem,
    Grid,
    useColorMode,
} from "@chakra-ui/react"
import { TriangleUpIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { reduce, range, sum, take } from 'ramda';
import { useResizeDetector } from 'react-resize-detector';

type textAlign = 'left' | 'right' | undefined;
type size = 'sm' | 'mid' | 'lg' | undefined;
type sort = {
    sortKey: string;
    isSortedDesc: boolean | undefined;
}

interface resize {
    resize?: undefined | {setResize:(param:object)=>void; resize:object; };
    resizeId?:string;
}
export interface TableText extends resize {
    children: React.ReactNode;
    size?: size;
    textAlign?: textAlign;
}

export interface ThSortProps extends TableText {
    sortKey: string;
    sort: [sort, React.Dispatch<React.SetStateAction<sort>>]
}

interface TableProps {
    children: ((arg: any) => React.ReactNode[])[];
    strip?: boolean;
    columns: any[];
    data: any[][];
    template: 'auto' | 'even' | Array<number>
    enableCollapse: boolean;
    showRange?: number;
}

type stripStyle = {
    [key: string]: {
        background: string;
    } | {};
}
interface TdCollapsedProps {
    children: (arg: any) => React.ReactNode[];
    row: unknown[];
    show: boolean;
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
export const CellContainer = ({ children, textAlign = "left" }: { children: React.ReactNode, textAlign: textAlign} ): JSX.Element => {
    return <Box textAlign={textAlign} textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap" mx="2" minW="12" maxW="96">{children}</Box>;
};

export const ThRow = ({ children }: { children: React.ReactNode[] }) => {
    return <>{children}</>
}

export const ThPure = ({ children, size, textAlign, resize, resizeId="" }: TableText): JSX.Element => {
    const justifyContent = getTextAlign(textAlign);
    const h = getH(size);
    const { ref } = useResizeDetector({
        skipOnMount: true,
        onResize: (w) => {
            if(resize){
                resize.setResize({ ...resize.resize, [resizeId]: w });
            }
        }
    });
    const { colorMode } = useColorMode();
    return <Flex ref={ref} resize={resize? "horizontal" : "none"} overflow="auto" className="cell" alignItems="center" bg={colorMode === 'light' ? 'neutralLight.200' : 'neutralDark.600'} justifyContent={justifyContent} h={h} outline="1px solid" outlineColor={colorMode === 'light' ? '#B4BFCC' : '#636974'} color={colorMode === 'light' ? 'neutralLight.700' : 'neutralDark.100'}>
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
    const { colorMode } = useColorMode();
    return <Flex className="cell" alignItems="center" bg={ colorMode === 'light' ? 'neutralLight.200' : 'neutralDark.600'} outline="1px solid" outlineColor={colorMode === 'light' ? '#B4BFCC' : '#636974'} justifyContent={justifyContent} h={h} color={colorMode === 'light' ? 'neutralLight.700' : 'neutralDark.100'}>
        <CellContainer textAlign={textAlign}>{children}</CellContainer>
        <Flex width="4" mx="2" flexDirection="column">
            <Box onClick={() => setIsSortedDesc({
                sortKey,
                isSortedDesc: setSorted(false)
            })}
                _hover={{
                    color: colorMode === 'light' ? 'neutralLight.700' : 'neutralDark.100',
                    cursor: 'pointer',
                }}
                aria-label="table sort" h={2.5} w={2.5} lineHeight="0" color={(isSelfSorting && isSortedDesc === false) ? (colorMode === 'light' ? 'neutralLight.700' : 'neutralDark.100') :  (colorMode === 'light' ? 'neutralLight.500' : 'neutralDark.300')} >
                <TriangleUpIcon h={2.5} w={2.5} />
            </Box>
            <Box onClick={() => setIsSortedDesc(
                {
                    sortKey,
                    isSortedDesc: setSorted(true)
                }
            )}
                _hover={{
                    color: colorMode === 'light' ? 'neutralLight.700' : 'neutralDark.100',
                    cursor: 'pointer',
                }}
                aria-label="table sort" h={2.5} w={2.5} lineHeight="0" color={(isSelfSorting && isSortedDesc === true) ? (colorMode === 'light' ? 'neutralLight.700' : 'neutralDark.100') : (colorMode === 'light' ? 'neutralLight.500' : 'neutralDark.300')}>
                <TriangleDownIcon h={2.5} w={2.5} />
            </Box>
        </Flex>
    </Flex>
}

export const TdPure = ({ children, size, textAlign }: TableText) => {
    const justifyContent = getTextAlign(textAlign);
    const h = getH(size);
    const { colorMode } = useColorMode();
    return <GridItem bg={colorMode === 'light' ? 'neutralDark.50' : 'neutralDark.900'} className="cell"><Flex alignItems="center" outline="1px solid" outlineColor={colorMode === 'light' ? '#DDE3EE' : '#393E47'} justifyContent={justifyContent} h={h} color={colorMode === 'light' ? 'neutralLight.700' : 'neutralDark.200'}><CellContainer textAlign={textAlign}>{children}</CellContainer></Flex></GridItem>
}

export const TdCollapsed = ({ children, row, show }: TdCollapsedProps) => {
    const { colorMode } = useColorMode();
    return (<>
        {show &&
            [<GridItem bg={colorMode === 'light' ? 'neutralDark.50' : 'neutralDark.900'} gridColumn="1/-1"><Box outline="1px solid" outlineColor={colorMode === 'light' ? '#DDE3EE' : '#393E47'} color={colorMode === 'light' ? 'neutralLight.700' : 'neutralDark.200'}>{children(row)}</Box></GridItem >]
        }
    </>);
}

const isObject = (val:unknown) => {
    return val != null && typeof val === 'object' && Array.isArray(val) === false;
};

export const Table = ({ children, strip = false, columns = [], data = [], template = 'auto', enableCollapse = false, showRange = data.length + 1 }: TableProps): JSX.Element => {
    const compensation = enableCollapse ? 1 : 0;
    const columnLen = columns.length + compensation;
    let girdTemplate = `repeat(${columnLen}, 1fr)`;
    let width;
    if (template === 'even') {
        girdTemplate = `repeat(${columnLen}, minmax(6rem, 1fr))`;
    }
    if (isObject(template)) {
        girdTemplate =  Object.values(template).map((v)=>v+'px').join(' ')
    }
    if (Array.isArray(template)) {
        const total = sum(template);
        const min = Math.min(...template);
        width = Math.ceil(6 / min * total);
        girdTemplate = template.map((v) => `${Math.floor(v / total * 100)}%`).join(' ');
    }
    const { colorMode } = useColorMode();
    const stripStyle = strip ? reduce((aggregate: stripStyle, offset: number): stripStyle => {
        return {
            ...aggregate,
            [`*:nth-of-type(${2 * columnLen}n - ${offset + compensation})`]: {
                background: colorMode === 'light' ? 'neutralLight.100' : 'neutralDark.800',
            }
        }
    },
        {}, range(0, columnLen)) : {};

    const headers = children[0](columns);
    const contents = children[1](data);
    return <Grid templateColumns={girdTemplate} sx={stripStyle} minWidth={`${width}rem`}>
        {headers}
        {take(showRange, contents)}
    </Grid>
}