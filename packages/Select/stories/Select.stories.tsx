import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import MultipleSelect, { SelectLayout, SingleSelect, SelectProps } from '../src/Select';
import { map, filter } from 'ramda';
import { SelectProps } from '@chakra-ui/react';


export default {
    title: 'Select',
    component: MultipleSelect,
} as Meta;

const MutliTemplate: Story<SelectProps> = (args) => {
    const [select, setSelect] = useState({
        currentSelection: [1,7,3],
        items: [
            { value: 1, label: 'apple' }, { value: 2, label: 'orange' }, { value: 3, label: 'blanana' },
            { value: 4, label: 'Apples' }, { value: 5, label: 'Oranges' }, { value: 6, label: 'Blananas' },
            { value: 7, label: 'pink' }, { value: 8, label: 'yellow' }, { value: 9, label: 'blue' }

        ],
    });
    console.log('select',select)
    return (
        <SelectLayout select={select}  setSelect={setSelect} width='20rem'>
            {
                (selection, setSelection) => <MultipleSelect select={selection} setSelect={setSelection}/>
            }
            {
               (selection, setSelection) => map(({ value, label }) => <MultipleSelect.Option key={value} value={value} label={label} currentSelection={selection.currentSelection} setSelect={(v) => {
                setSelection({
                    ...selection,
                    currentSelection: selection.currentSelection.includes(v) ? filter((elem)=>elem!==v, selection.currentSelection) : [ ...selection.currentSelection,v]
                })
            }} />, filter(({value})=>`${value}`.includes(`${selection.filter}`), selection.items))
            }
        </SelectLayout>
    )
}; 

export const mutli = MutliTemplate.bind({});
mutli.args = {
};

const SingleTemplate: Story<SelectProps> = (args) => {
    const [select, setSelect] = useState({
        currentSelection: [],
        items: [{ label: '英语',value: 'english' },{label: '中文',value: 'chinese'}, {label: '数学', value: 'math'}]
    })
    return (
        <SelectLayout select={select} setSelect={setSelect} width='10rem'>
            {
                (selection) => <SingleSelect select={selection} />
            }
            {
               (selection, setSelection) => map(({ value, label }) => <SingleSelect.Option key={value} value={value} label={label} currentSelection={selection.currentSelection} setSelect={(v) => {
                setSelection({
                    ...selection,
                    currentSelection: v
                })
            }} />,  selection.items)
            }
        </SelectLayout>
    )
}

export const single = SingleTemplate.bind({});
single.args = {
};