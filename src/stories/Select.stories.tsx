import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { EmailIcon } from '@chakra-ui/icons';
import Select, { SelectLayout, MultipleSelect } from '../components/Select';
import { SelectProps } from '@chakra-ui/react';
import { Button, ButtonProps } from '../components/Button';
import { map, uniq, filter } from 'ramda';

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
const MutliTemplate: Story<SelectProps> = (args) => {
    const [select, setSelect] = useState({
        currentSelection: [1,20,3,33,],
        items: [
            { value: 1, label: 1 }, { value: 20, label: 20 }, { value: 3, label: 3 },
            { value: 33, label: 33 }, { value: 10, label: 10 }, { value: 6, label: 6 }
        ],
    });
    return (
        <SelectLayout select={select}  setSelect={setSelect}>
            {
                (selection, setSelection) => <MultipleSelect select={selection} setSelect={setSelection}/>
            }
            {
               (selection, setSelection) => map(({ value, label }) => <MultipleSelect.Option key={value} value={value} label={label} currentSelection={selection.currentSelection} setSelect={(v) => {
                   console.log(selection.currentSelection.includes(v) ? filter((elem)=>elem!==v, selection.currentSelection) : [v, ...selection.currentSelection])
                setSelection({
                    ...selection,
                    currentSelection: selection.currentSelection.includes(v) ? filter((elem)=>elem!==v, selection.currentSelection) : [v, ...selection.currentSelection]
                })
            }} />, filter(({value})=>`${value}`.includes(`${selection.filter}`), selection.items))
            }
        </SelectLayout>
    )
};
export const single = Template.bind({});
single.args = {

};

export const mutli = MutliTemplate.bind({});
mutli.args = {

};