import { ThSort, TdPure, ThSortProps, ThRow } from '../components/Table';
import React,{useState} from 'react';
import { Story, Meta } from '@storybook/react';

import {
    Grid,
} from "@chakra-ui/react"
export default {
    title: 'Example/Table',
    component: ThSort,
} as Meta;

const Template: Story<ThSortProps> = (args) => {
    const [sort, setSort] = useState({sortKey:'', isSortedDes:undefined})
    return <div><Grid templateColumns="1fr 1fr 1fr 1fr 1fr" sx={{
        '*:nth-child(10n)': {
          background: 'nl.09',
        },
        '*:nth-child(10n -1)': {
            background: 'nl.09',
        },
        '*:nth-child(10n - 2)': {
            background: 'nl.09',
        },
        '*:nth-child(10n - 3)': {
            background: 'nl.09',
        },
        '*:nth-child(10n - 4)': {
            background: 'nl.09',
        }
      }}>
        <ThRow>
            <ThSort {...args}  sort={[sort, setSort]} sortKey="a"/>
            <ThSort {...args}  sort={[sort, setSort]} sortKey="b">agjhljahgjdhgjdghjfhgdjsghfdjkhsjghsjlghjkhgfdsjklhgfdsljkghfdljkfghfljkfhslkjhfgjkldhgsldfkghlkjf</ThSort>
            <ThSort {...args}  sort={[sort, setSort]} sortKey="c"/>
            <ThSort {...args}  sort={[sort, setSort]} sortKey="d"/>
            <ThSort {...args}  sort={[sort, setSort]} sortKey="e"/>
        </ThRow>
        <ThRow>
            <TdPure {...args} />
            <TdPure {...args} />
            <TdPure {...args} />
            <TdPure {...args} />
            <TdPure {...args} />
        </ThRow>
        <ThRow>
            <TdPure>fmajfhjk.hfhajkhgjdhgsjghfjsdghfjsgfhjhgsjfdhsjghdjghdfjghdsjkghfdjshgjkshgjskghfjlgkhsjshlhgfdljkghsjkghdslg</TdPure>
            <TdPure {...args} />
            <TdPure {...args} />
            <TdPure {...args} />
            <TdPure {...args} />
        </ThRow>
        <ThRow>
            <TdPure {...args} />
            <TdPure {...args} />
            <TdPure {...args} />
            <TdPure {...args} />
            <TdPure {...args} />
        </ThRow>
        <ThRow>
            <TdPure {...args} />
            <TdPure {...args} />
            <TdPure {...args} />
            <TdPure {...args} />
            <TdPure {...args} />
        </ThRow>
        <ThRow>
            <TdPure {...args} textAlign="right"/>
            <TdPure {...args} />
            <TdPure {...args} />
            <TdPure {...args} />
            <TdPure {...args} />
        </ThRow>
        </Grid>
    </div>
};

export const Sort = Template.bind({});
Sort.args = {
    children: 1213
};