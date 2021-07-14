import React, {useState, } from 'react';
import { Story, Meta } from '@storybook/react';
import { addIndex, map, range } from 'ramda';
import {Table, ThSort, TdPure} from '@minion-ui/table';
import { Box } from '@chakra-ui/react';
import ScrollBottomTrigger from '../src/ScrollBottomTrigger';

type column = {
    columnName: string;
    column: string;
}
type columns = column[];

const WrapTableTemplate: Story = () => {
    const [sort, setSort] = useState({ sortKey: '', isSortedDesc: undefined });
    const columns: columns = [
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
        }
    ];
    const data = range(1, 6).map((_, index) => range(1 + index , 5 + index));
    const height = 300;
    const lineHeigt = 40;
    const lines = Math.ceil(height / lineHeigt) + 1;
    const [showRange, setShowRange] = useState<number>(lines);
    const mapWithIndex = addIndex(map);

    const scrollBottomCallback = () => {
        const newLines = showRange + lines;
            if (newLines <= data.length) {
                setShowRange(newLines);
            } else {
                setShowRange(data.length)
            }
    }

    return <ScrollBottomTrigger maxHeight='300px' scrollBottomCallback={scrollBottomCallback}> 
        <Table strip columns={columns} data={data} template="even" showRange={showRange}  enableCollapse={false}>
        {
            (cols) => map(({ columnName, column }) => <Box position="sticky"><ThSort key={column} sort={[sort, setSort]} sortKey={column}>{columnName}</ThSort></Box>, cols)
        }
        {
            (d) => mapWithIndex(
                (val, index) => mapWithIndex((val1, index1) => <TdPure  key={`${index}_${index1}`} >{val1}</TdPure>, val),
                d)
        }
    </Table>
    </ScrollBottomTrigger>
}

export const WrapTable = WrapTableTemplate.bind({})

export default {
    title: 'ScrollBottom',
    component: WrapTable,
} as Meta;