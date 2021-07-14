import { ThSort, TdPure, ThSortProps, ThRow, Table, ThPure, TdCollapsed } from '../src/Table';
import React, { useState, useEffect } from 'react';
import { Story, Meta } from '@storybook/react';
import { map, range, addIndex, takeWhile, repeat } from 'ramda';
import {
    IconButton,
    Box,
    useColorMode,
    Button,
} from "@chakra-ui/react"
import { ChevronDownIcon } from '@chakra-ui/icons'

export default {
    title: 'Table',
    component: ThSort,
} as Meta;

type column = {
    columnName: string;
    column: string;
}
type columns = column[];
const Template: Story<ThSortProps> = (args) => {
    const [sort, setSort] = useState({ sortKey: '', isSortedDes: undefined });
    const { colorMode } = useColorMode();
    const [colorModeState, setColorModeState] = useState<string>(colorMode)
    const columns: columns = [
        {
            columnName: '',
            column: "func"
        },
        {
            columnName: 'a',
            column: 'a',
        },
        {
            columnName: 'b',
            column: 'b',
        },
        {
            columnName: 'c',
            column: 'c',
        },
        {
            columnName: 'd',
            column: 'd',
        },
        {
            columnName: 'ejkadhflkahaljkdhsgsljaghdjksghaljkghasjkghjkdshggjklghjklhgdjksahgjklahgdashdlgkdjhsgaljk',
            column: 'e',
        },
        {
            columnName: 'f',
            column: 'f',
        },
        {
            columnName: 'g',
            column: 'g',
        },
        {
            columnName: 'a',
            column: 'a',
        },
        {
            columnName: 'b',
            column: 'b',
        },
        {
            columnName: 'c',
            column: 'c',
        },
        {
            columnName: 'd',
            column: 'd',
        },
        {
            columnName: 'e',
            column: 'e',
        },
        {
            columnName: 'f',
            column: 'f',
        },
        {
            columnName: 'g',
            column: 'g',
        },
    ];
    const data = [range(1, 15), 
        range(1, 15), range(1, 15), range(1, 15), range(1, 15), range(1, 15), range(1, 15), range(1, 15)
    ];
    const mapWithIndex = addIndex(map);

    useEffect(() => {
        localStorage.setItem('chakra-ui-color-mode', 'light' )
    }, [])
    return <Box>
        <Table strip columns={columns} data={data} template="even">
        {
            (cols) => map(({ columnName, column }) => <Box position="sticky"><ThSort key={column} sort={[sort, setSort]} sortKey={column}>{columnName}</ThSort></Box>, cols)
        }
        {
            (d) => mapWithIndex(
                (val, index) => mapWithIndex((val1, index1) => <TdPure  key={`${index}_${index1}`} >{val1}</TdPure>, val),
                d)
        }
    </Table>
    <Button marginTop='1rem' onClick={() => {
        const otherColorMode = localStorage.getItem('chakra-ui-color-mode') === 'light' ? 'dark' : 'light' ;
        localStorage.setItem('chakra-ui-color-mode', otherColorMode);
        // rerender
        setColorModeState(otherColorMode) }}>switch theme</Button>
    </Box>
};

export const Sort = Template.bind({});


const SingleTemplate: Story<ThSortProps> = (args) => {
    const columns: columns = [
        {
            columnName: 'a',
            column: "func"
        },
        {
            columnName: 'b',
            column: "b"
        },
    ];
    const data = [[1,2],["312323133123131231231231312313131313123123131231231231231","76575757575675"]];
    const mapWithIndex = addIndex(map);
    const [resize, setResize] = useState({func: 250, b: 250});

    return <Table template={resize} strip columns={columns} data={data}>
        {
            (cols) => map(({ columnName, column }) => <Box position="sticky"><ThPure textAlign="right" resizeId={column} resize={{resize, setResize}} key={column}>{columnName}</ThPure></Box>, cols)
        }
        {
            (d) => mapWithIndex(
                (val, index) => mapWithIndex((val1, index1) => <TdPure  key={`${index}_${index1}`} >{val1}</TdPure>, val),
                d)
        }
    </Table>
};

export const  Single= SingleTemplate.bind({});

const CustomizedTemplate: Story<ThSortProps> = (args) => {
    const columns: columns = [
        {
            columnName: '',
            column: "func"
        },
        {
            columnName: 'a',
            column: "a"
        },
        {
            columnName: 'b',
            column: "b"
        },
        {
            columnName: 'c',
            column: "c"
        },
    ];
    const data = [range(1, 4), 
        range(1, 4), range(1, 4),  range(1, 4)];
    const mapWithIndex = addIndex(map);
    const [showCollapse, setShowCollapse] = useState([]);
    
    return <Table strip columns={columns} data={data} template={[1, 1,1, 2]} enableCollapse={true}>
        {
            (cols) => map(({ columnName, column }) => <Box position="sticky"><ThPure textAlign="right" key={column}>{columnName}</ThPure></Box>, cols)
        }
        {
            (d) => mapWithIndex(
                (val, index) => [<TdPure key={`${index}-action`}><IconButton aria-label="action" icon={<ChevronDownIcon/>} onClick={()=>setShowCollapse(showCollapse.includes(index) ? takeWhile((v)=>v!==index,showCollapse) : [...showCollapse, index])}/></TdPure>, ...mapWithIndex((val1, index1) => <TdPure  key={`${index}_${index1}`} >{val1}</TdPure>, val), <TdCollapsed show={showCollapse.includes(index)} key={`${index}-collapsed`} row={val}>
                    {
                        (row)=> <div>{row.join('-_____________________________')}</div>
                    }
                </TdCollapsed>],
                d)
        }
    </Table>
};

export const Customized= CustomizedTemplate.bind({});