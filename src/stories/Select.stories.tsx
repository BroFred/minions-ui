import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { EmailIcon } from '@chakra-ui/icons';
import Select, { SelectLayout } from '../components/Select';
import { SelectProps } from '@chakra-ui/react';
import { Button, ButtonProps } from '../components/Button';

import { map } from 'ramda';

export default {
    title: 'Example/Select',
    component: Select,
} as Meta;

const Template: Story<SelectProps> = (args) => {
    const [select, setSelect] = useState({
        currentSelection: 2,
        items: [
            { value: 1, label: 1 }, { value: 2, label: 2 }, { value: 3, label: 3 }
        ]
    });
    return (
        <SelectLayout select={select}>
            {
                (select) => <Select select={select} />
            }
            {
                (select) => map(({ value, label }) => <Select.Option value={value} label={label} currentSelection={select.currentSelection} setSelect={(v) => {
                    setSelect({
                        ...select,
                        currentSelection: v
                    })
                }} />, select.items)
            }
        </SelectLayout>
    )
};

export const Primary = Template.bind({});
Primary.args = {

};