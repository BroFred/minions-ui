import { ThSort, TdPure, ThSortProps, ThRow, Table, ThPure } from '../src/Table';
import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { map, range, addIndex, drop } from 'ramda';
import {
    Grid,
    Box
} from "@chakra-ui/react"
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
    return <Table strip columns={columns} data={data} template="even">
        {
            (cols) => map(({ columnName, column }) => <Box position="sticky"><ThSort key={column} sort={[sort, setSort]} sortKey={column}>{columnName}</ThSort></Box>, cols)
        }
        {
            (d) => mapWithIndex(
                (val, index) => mapWithIndex((val1, index1) => <TdPure  key={`${index}_${index1}`} >{val1}</TdPure>, val),
                d)
        }
    </Table>
};

export const Sort = Template.bind({});


const SingleTemplate: Story<ThSortProps> = (args) => {
    const columns: columns = [
        {
            columnName: 'a',
            column: "func"
        },
    ];
    const data = [[1],["312323133123131231231231312313131313123123131231231231231"]];
    const mapWithIndex = addIndex(map);
    return <Table strip columns={columns} data={data} template="even">
        {
            (cols) => map(({ columnName, column }) => <Box position="sticky"><ThPure textAlign="right" key={column}>{columnName}</ThPure></Box>, cols)
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
        range(1, 4), range(1, 4)];
    const mapWithIndex = addIndex(map);
    return <Table strip columns={columns} data={data} template={[1, 1, 2]}>
        {
            (cols) => map(({ columnName, column }) => <Box position="sticky"><ThPure textAlign="right" key={column}>{columnName}</ThPure></Box>, cols)
        }
        {
            (d) => mapWithIndex(
                (val, index) => mapWithIndex((val1, index1) => <TdPure  key={`${index}_${index1}`} >{val1}</TdPure>, val),
                d)
        }
    </Table>
};

export const Customized= CustomizedTemplate.bind({});